import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {Apollo, gql } from 'apollo-angular';
import { VarsFacade } from '@pawdopt/shared/data-store';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Storage } from '@capacitor/storage';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'pawdopt-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [Apollo, VarsFacade]
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
    visible: boolean
    }[] = [];
    
  currentIndex: number;
  results : string[] = []; //to show the liked/disliked dogs
  storeIndex: number[] = [];
   t_ID: string;

    constructor(private router: Router, private apollo: Apollo, private varsFacade: VarsFacade, private fireAuth: AngularFireAuth, private loadingCtrl: LoadingController) {
      this.t_ID = "";
      this.currentIndex = -1;
      // this.setObject();
      this.fireAuth.currentUser.then(user => {
        console.log(user?.uid);
        if(user?.uid){
          this.t_ID = user.uid;
          console.log(this.t_ID);
          this.showLoading();
          this.getDogs();
        }
      });
    }

    async showLoading() {
      const loading = await this.loadingCtrl.create({
        message: 'Loading...',
        duration: 3500,
      });
  
      loading.present();
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
  
    ionViewWillEnter(){
      this.avatars = [];
      this.currentIndex = -1;
      this.setPrefs();
      this.getDogs();
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
    console.log(filters);
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
      console.log(result);
      const data = result.data as {
        findDogs: {
          _id: string,
          name: string,
          gender: string,
          breed: string,
          height: number,
          dob: Date,
          organisation: {
            name: string
          },
          pics: string[]
        }[];
      }
      
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
            lat: 0,
            lng: 0,
            // lat: element.organisation.location.lat
            // lng: element.organisation.location.lng,
            age: sage,
            organisation: element.organisation.name,
            pic: element.pics[0],
            visible: true
          }
        );
        this.currentIndex++;
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
      }).valueChanges.subscribe((result) => {
        console.log(result);
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
        console.log(this.avatars);
        console.log(data.findAdopterById.dogsLiked);
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
          visible: boolean
          }[] = [];
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
          const distance = 0;
          //distnace is calculated from user and orgs lat and lng
          if(this.maxDistance)
            if(distance >= this.maxDistance && this.maxDistance != 0){
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
            temp.push(element);
          }
        });
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
  }

  async swiped(event: boolean, index: number) {
    
    console.log(this.t_ID);
    console.log(this.avatars[index].name + ' swiped ' + event);
     if(event)
       await this.addDogToLiked(this.currentIndex);
      else
        await this.addDogToDisliked(this.currentIndex);
    this.avatars[index].visible = false;
    this.results.push(this.avatars[index].name + ' swiped ' + event); 
    console.log(index);
    console.log(this.currentIndex);
    this.currentIndex--;
  }


  swipeleft() { 
    if(this.currentIndex > -1){
      console.log(this.currentIndex);
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
    console.log(this.currentIndex + "this is the current index");
    this.avatars[this.currentIndex].visible = true;
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
        console.log(result);
        const data = result.data as {
          removeDogFromAdopterDogsLikedOrDisliked: {
            _id: string
          }
        }
        console.log(data);
      }
      );
      

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
      console.log('got data', data);
    }, (error) => {
      console.log('there was an error sending the query', error);
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
      console.log('got data', data);
    }, (error) => {
      console.log('there was an error sending the query', error);
    });
  }
}
