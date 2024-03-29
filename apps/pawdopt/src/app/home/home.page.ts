import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Storage } from '@capacitor/storage';
import { LoadingController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Platform } from '@ionic/angular';
import { APP_CONFIG } from '@pawdopt/config';

@Component({
  selector: 'pawdopt-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [Apollo]
})
export class HomePage {

  //global vars
  breed!: string;
  gender!: string;
  maxDistance = 0;
  minAge= 0;
  maxAge= 0;
  minSize = 0;
  maxSize = 0;

  avatars:{
    _id: string,
    name: string,
    gender: string,
    breed: string,
    height: number,
    lat: number,
    lng: number,
    age: number,
    organisation:string,
    pic: string,
    visible: boolean,
    distanceFromUser: number
    }[] = [];

    // Readable Address
   address!: string;

   // Location coordinates
  latitude!: number;
  longitude!: number;
  accuracy!: number;

  options = {
    timeout: 10000, 
    enableHighAccuracy: true, 
    maximumAge: 3600
  };
    
  currentIndex: number;
  results : string[] = []; //to show the liked/disliked dogs
  storeIndex: number[] = [];
   t_ID: string;
  loading: Promise<HTMLIonLoadingElement>;
  uselessvariable = 0;

    constructor(private router: Router, private apollo: Apollo, private fireAuth: AngularFireAuth, private loadingCtrl: LoadingController, private geolocation: Geolocation, private platform: Platform, @Inject(APP_CONFIG) private appConfig: any) {
      this.t_ID = "";
      this.currentIndex = -1;
      this.loading = this.loadingCtrl.create({
        message: 'Loading...',
      });
      this.fireAuth.currentUser.then(user => {
        if(user?.uid){
          this.t_ID = user.uid;
        }
      });
    }

    // <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
  // <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
  // <uses-feature android:name="android.hardware.location.gps" />

  //Get current coordinates of device
  getGeolocation() {
    this.platform.ready().then(() => {
      this.geolocation.getCurrentPosition(this.options).then((resp) => {
        this.latitude = resp.coords.latitude;
        this.longitude = resp.coords.longitude;
        const latLng = this.latitude + "," + this.longitude;
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latLng}&key=${this.appConfig.MAPS_API_KEY}`)
        .then((responseText) => {
            return responseText.json();
        })
        .then(jsonData => {
            this.address = jsonData.results[0].formatted_address;
            this.loading = this.loadingCtrl.create({
              message: 'Finding Dogs closest to ' + this.address,
            });
        })
      }).catch((error) => {
        alert('Error getting location' + JSON.stringify(error));
      });
    });
  }

  getDistanceFromLatLonInKm(lat1 : number,lon1 : number,lat2 : number,lon2 : number) {
    const R = 6371; // Radius of the earth in km
    const dLat = this.deg2rad(lat2-lat1);  // deg2rad below
    const dLon = this.deg2rad(lon2-lon1); 
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const d = R * c; // Distance in km
    return d;
  }

  deg2rad(deg : number) {
    return deg * (Math.PI/180)
  }

  async showLoading() {
    (await this.loading).present();
  }

  async hideLoading() {
    (await this.loading).dismiss();
  }

    async setObject() {
      await Storage.set({
      key: 'preferences',
      value: JSON.stringify({
        gender:"",
        // breed: this.breed,
        size: {
          upper:0,
          lower:0
        },
        age: {
          lower: 0,
          upper: 0
        },
        location: 0
        })
      });
    }
  
    async ionViewWillEnter(){
      this.avatars = [];
      this.currentIndex = -1;
      await this.showLoading();
      this.getGeolocation();
      await this.setPrefs();
      this.getDogs();
      await this.hideLoading();
    }

  // this.apollo.query(getDogsQuery);
  
  async getObject() {
    const ret = await Storage.get({ key: 'preferences' });
    if(ret.value){
      return JSON.parse(ret.value);
    }
  }

  async setPrefs(){
    const filters = await this.getObject();
    if(filters && filters != undefined){
      if(filters.gender != undefined)
        this.gender = filters.gender;
      if(filters.age.lower != undefined)
        this.minAge = filters.age.lower;
      if(filters.age.upper != undefined)
        this.maxAge = filters.age.upper;
      if(filters.size.lower != undefined)
        this.minSize = filters.size.lower;
      if(filters.size.upper != undefined)
        this.maxSize = filters.size.upper;
      if(filters.location != undefined)
        this.maxDistance = filters.location;
    }
    if(this.gender == "any")
      this.gender = "";
  }

  getDogs(){
    this.avatars = [];
    const getDogsQuery = gql`query {
      findDogs(na : true){
        _id
        name
        dob
        gender
        pics
        breed
        organisation{
          name
          location{
            lat
            lng
          }
        }
        height
      }
    }`;

    const myDate = new Date();
    let sage = 0;
    let tempDate;
    this.apollo.watchQuery({
      query: getDogsQuery,
      fetchPolicy: 'no-cache'
    }).valueChanges.subscribe((result) => {
      const data = result.data as {
        findDogs: {
          _id: string,
          name: string,
          gender: string,
          breed: string,
          height: number,
          dob: Date,
          organisation: {
            name: string,
            location: {
              lat: number,
              lng: number
            }
          },
          pics: string[]
        }[];
      }
      //if(data.findDogs.length <= 0)
        //this.hideLoading();
      data.findDogs.forEach(element => {
        tempDate = new Date(element.dob);
        sage = myDate.getFullYear() - tempDate.getFullYear();
        this.avatars.push(
          {
            _id: element._id,
            name: element.name,
            gender: element.gender,
            breed: element.breed,
            height: element.height,
            lat: element.organisation.location.lat,
            lng: element.organisation.location.lng,
            age: sage,
            organisation: element.organisation.name,
            pic: element.pics[0],
            visible: true,
            distanceFromUser: this.getDistanceFromLatLonInKm(this.latitude, this.longitude, element.organisation.location.lat, element.organisation.location.lng)
          }
        );
        this.currentIndex++;
        //sort the avatars array by distanceFromUser in descending order
        this.avatars.sort((a, b) => (a.distanceFromUser > b.distanceFromUser) ? -1 : 1);

        
      });
      const findAdopterByIdQuery = gql`query{
        findAdopterById(_id: "${this.t_ID}"){
          dogsLiked{
            _id
          }
          dogsDisliked{
            _id
          }
        }
      }`
      this.apollo.watchQuery({
        query: findAdopterByIdQuery,
        fetchPolicy: 'no-cache'
      }).valueChanges.subscribe(async (result) => {
        const data = result.data as {
          findAdopterById: {
            dogsLiked: {
              _id: string
            }[],
            dogsDisliked: {
              _id: string
            }[]
          }
        }
        
        // this.avatars.forEach(element => {
          data.findAdopterById.dogsLiked.forEach(element2 => {
            const index = this.avatars.findIndex(function(dog){
              return dog._id == element2._id;
            });
            if(index != -1){
              this.avatars.splice(index, 1);
              this.currentIndex--;
            }
          }
          );
        // }
        // );
        // this.avatars.forEach(element => {
          data.findAdopterById.dogsDisliked.forEach(element2 => {
            const index = this.avatars.findIndex(function(dog){
              return dog._id == element2._id;
            });
            if(index != -1){
              this.avatars.splice(index, 1);
              this.currentIndex--;
            }
          });
        // });
        
        //loop through avatars and exclude elements that dont confide to the filters
        const temp:{
          _id: string,
          name: string,
          gender: string,
          breed: string,
          height: number,
          lat: number,
          lng: number,
          age: number,
          organisation:string,
          pic: string,
          visible: boolean,
          distanceFromUser: number
          }[] = [];
          this.currentIndex = -1;
        this.avatars.forEach(element => {
          let splice = false;
          // if(this.breed)
          //   if(element.breed != this.breed){
          //     splice = true;
          //   }
          if(this.gender)
            if(element.gender != this.gender && this.gender != ""){
              splice = true;
            }
          //distnace is calculated from user and orgs lat and lng
          if(this.maxDistance)
            if(element.distanceFromUser >= this.maxDistance && this.maxDistance != 0){
              splice = true;
            }
          if(this.minAge && this.maxAge)
            if((element.age < this.minAge || element.age >= this.maxAge) && this.maxAge != 0){
              splice = true;
            }
          if(this.minSize && this.maxSize)
            if((element.height <= this.minSize || element.height >=this.maxSize) && this.maxSize != 0){
              splice = true;
            }
          if(!splice){
            this.currentIndex++;
            temp.push(element);
          }
        });
        this.avatars = [];
        this.avatars = temp;
      });
    });
    //we have filtered out the dogs
    //compare the dogs with the liked dogs
    //if they are liked, remove them from the avatars
    //if they are disliked, remove them from the avatars
    //if they are not liked or disliked, keep them in the avatars
    //if there are no more dogs, show a message
    //if there are more dogs, show them
    
    this.hideLoading();
  }

  async swiped(event: boolean, index: number) {
    
     if(event)
        await this.addDogToLiked(this.currentIndex);
      else
        await this.addDogToDisliked(this.currentIndex);
    this.avatars[index].visible = false;
    this.results.push(this.avatars[index].name + ' swiped ' + event.toString()); 
    this.currentIndex--;
  }


  swipeleft() { 
    if(this.currentIndex > -1){
      this.addDogToDisliked(this.currentIndex);
      this.avatars[this.currentIndex].visible = false;
      this.results.push(this.avatars[this.currentIndex].name + ' swiped false');
      this.currentIndex--;
    }
  }

  swiperight() {
    if(this.currentIndex > -1){
      this.addDogToLiked(this.currentIndex);
      this.avatars[this.currentIndex].visible = false;
      this.results.push(this.avatars[this.currentIndex].name + ' swiped true');
      this.currentIndex--;
    }
  }

  retry() {//The retry works but the mutation call errors out
    this.currentIndex++;
    this.avatars[this.currentIndex].visible = true;
    const thisDog = this.avatars[this.currentIndex].name;
    const index1 = this.results.findIndex(function(dog){
      return dog == thisDog + ' swiped false';
    });
    const index2 = this.results.findIndex(function(dog){
      return dog == thisDog + ' swiped true';
    });
    if(index1 != -1){
      this.results.splice(index1, 1);
    }
    if(index2 != -1){
      this.results.splice(index2, 1);
    }
    const removeDogFromAdopterDogsLikedOrDislikedQuery = gql`mutation{
        removeDogFromAdopterDogsLikedOrDisliked(
          userId: "${this.t_ID}",
          dogId: "${this.avatars[this.currentIndex]._id}"
        ){  
          _id
        }
      }`;
      this.apollo.mutate({
        mutation: removeDogFromAdopterDogsLikedOrDislikedQuery,
        fetchPolicy: 'no-cache'
      }).subscribe((result) => {
        this.uselessvariable = 1;
      }
      );
      

  }

  async locationPicked(){
    this.showLoading();
    setTimeout(() => {      
      this.hideLoading();
    }, 1000);
  }

  home(){
    this.router.navigate(["/home"]);
  }

  likeddogs(){
    this.router.navigate(["/userlikes"]);
  }

  profile(){
    this.router.navigate(["/userprofile"]);
  }

  preferences(){
    this.router.navigate(["/preferences"]);
  }

      
  async addDogToLiked(index: number) {    
    const addDogToLikedMutation = gql`
      mutation {
        userSwipesRight(userId: "${this.t_ID}", dogId: "${this.avatars[index]._id}") {
          name
        }
      }
    `;
    this.apollo.mutate({
      mutation: addDogToLikedMutation,
      fetchPolicy: 'no-cache'
    }).subscribe(({data}) => {
      this.uselessvariable = 1;
    });
  }
  
  async addDogToDisliked(index: number) {
    const addDogToDislikedMutation = gql`
      mutation {
        userSwipesLeft(userId: "${this.t_ID}", dogId: "${this.avatars[index]._id}") {
          name
        }
      }
    `;
    this.apollo.mutate({
      mutation: addDogToDislikedMutation,
      fetchPolicy: 'no-cache'
    }).subscribe(({data}) => {
      this.uselessvariable = 1;
    });
  }

  gotoChat(){
    this.router.navigate(["/chatlist"]);
  }
}
