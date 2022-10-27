import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LoadingController, Platform } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { APP_CONFIG } from '@pawdopt/config';

import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';


@Component({
  selector: 'pawdopt-addorg',
  templateUrl: 'addorg.page.html',
  styleUrls: ['addorg.page.scss', '../../../../../shared/styles/global.scss'],
  providers: [Apollo, AngularFireAuth]
})


export class AddorgPageComponent {
  imageString!: string;
  oName!: string;
  about!: string;
  date!: Date;
  lat!: string;
  lng!: string;
  rulesReq!: string;
  email!: string;
  phone!: string;
  website!: string;
  facebook!: string;
  instagram!: string;
  twitter!: string;
  logo!: string;
  enterpriseID!: string;
  orgMembers: [{
    id?: string;
    name: string;
    email: string;
    role: string;
    verification: string;
  }]
  slideOpts = {
    slidesPerView: 1,
    freeMode: false,
    effect: 'fade',
    fadeEffect: {
      crossfade: true
    }
  }
  oId!: string;
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
  imageToShow!: string;
  hideImage: boolean;
  loading: Promise<HTMLIonLoadingElement>;

  constructor(private router: Router, private apollo: Apollo, private fireAuth: AngularFireAuth, private geolocation: Geolocation,  private platform : Platform, public actionSheetController: ActionSheetController, public alertController: AlertController, @Inject(APP_CONFIG) private appConfig: any, private loadingCtrl: LoadingController) {
    this.getGeolocation();
    this.hideImage = true;
    this.orgMembers=[{
      id: "",
      name: "",
      email: "",
      role: "",
      verification: new Date().getFullYear()+"-"+new Date().getMonth()+"-"+new Date().getDate()
      }];
    this.orgMembers.pop();
    this.loading = this.loadingCtrl.create({
      message: 'Loading...',
    });
  }

  async showLoading() {
    (await this.loading).present();
  }

  async hideLoading() {
    (await this.loading).dismiss();
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
        this.accuracy = resp.coords.accuracy;
        const latLng = this.latitude + "," + this.longitude;
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latLng}&key=${this.appConfig.MAPS_API_KEY}`)
        .then((responseText) => {
            return responseText.json();
            console.log(responseText);
        })
        .then(jsonData => {
            this.address = jsonData.results[0].formatted_address;
        })
      }).catch((error) => {
        alert('Error getting location' + JSON.stringify(error));
      });
    });
  }

  validate() {
    if(this.rulesReq == null || this.rulesReq == undefined){
      this.rulesReq = "";
    }
    if(this.email == null || this.email == undefined){
      this.email = "";
    }
    if(this.phone == null || this.phone == undefined){
      this.phone = "";
    }
    if(this.website == null || this.website == undefined){
      this.website = "";
    }
    if(this.facebook == null || this.facebook == undefined){
      this.facebook = "";
    }
    if(this.instagram == null || this.instagram == undefined){
      this.instagram = "";
    }
    if(this.twitter == null || this.twitter == undefined){
      this.twitter = "";
    }
    if(this.logo == null || this.logo == undefined){
      this.logo = "";
    }
  }

  addOrg(){
    //TODO: Add validation
    this.validate();
    
    this.showLoading();
    const addOrg = gql`mutation{
      createOrg(org:{
        _id: "",
        name: "${this.oName}",
        about: "${this.about}",
        dateFounded: "${this.date}",
        totalAdoptions: 0,
        totalDogs: 0,
        location:{
          lat: ${Number(this.latitude)},
          lng: ${Number(this.longitude)},
        },
        rulesReq: "${this.rulesReq}",
        contactInfo:{
          _id: "",
          email: "${this.email}",
          phone: "${this.phone}",
          website: "${this.website}",
          facebook: "${this.facebook}",
          instagram: "${this.instagram}",
          twitter: "${this.twitter}"
        },
        logo: "${this.imageString}"
      })
      {
        _id
        name
      }
    }`;

    
    this.apollo.mutate({
      mutation: addOrg,
    }).subscribe(result => {
      const createOrg = result.data as {
        createOrg: {
          name: string,
          _id: string
        }
      }
      this.oId = createOrg.createOrg._id;

      this.orgMembers.forEach(o => {
        o.email.toLowerCase();
        this.fireAuth.createUserWithEmailAndPassword(o.email, "123456").then((user) => {
          user.user?.updateProfile({
            displayName: o.name,
          });
          const id = user.user?.uid;
          o.verification = new Date().getFullYear()+"-"+new Date().getMonth()+"-"+new Date().getDate();

          const createOrgMember = gql`mutation{
            createOrgMember(member:{
              _id: "${id}",
              name: "${o.name}",
              email: "${o.email}",
              role: "${o.role}",
              organisation: "${this.oId}",
              verification: "${o.verification}"
            }){
              _id
            }
          }`;
          this.apollo.mutate({
            mutation: createOrgMember,
            fetchPolicy: 'no-cache'
          }).subscribe(() => {
            this.hideLoading();
            this.router.navigate(["/owneddogs"]);
          });
        })
      });
    });
  }

  async addOrgMemberCard(){
    this.orgMembers.push({
      id: "",
      name: "",
      email: "",
      role: "",
      verification: new Date().getFullYear()+"-"+new Date().getMonth()+"-"+new Date().getDate()
    });
  }

  deleteOrgMemberCard(o: {id?: string; name: string; email: string; role: string; verification: string;}){
    const index = this.orgMembers.indexOf(o);
    this.orgMembers.splice(index, 1);
    const slides = document.querySelector('ion-slides');
    slides?.slidePrev();
  }

  Back(){
    this.router.navigate(["/login"]);
  }

  showImage(){
    this.hideImage = false;
    return this.imageString;
  }

  async uploadPic(){
    const actionSheet = await this.actionSheetController.create({
      header: 'Upload picture',
      buttons: [{
        text: 'Take picture using your camera',
        icon: 'camera-outline',
        handler: () => {
          this.getPhoto(true);
        }
      }, {
        text: 'Choose a picture from your gallery',
        icon: 'image-outline',
        handler: async () => {
          await this.getPhoto(false);
          this.imageToShow = this.showImage();
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
      }]
    });
    await actionSheet.present();

  }

  async uploadDoc(){
    const actionSheet = await this.actionSheetController.create({
      header: 'Upload picture',
      buttons: [{
        text: 'Take picture using your camera',
        icon: 'camera-outline',
        handler: () => {
          this.getPhoto(true);
        }
      }, {
        text: 'Choose a picture from your gallery',
        icon: 'image-outline',
        handler: async () => {
          await this.getPhoto(false);
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
      }]
    });
    await actionSheet.present();

  }


  async getPhoto(fromCamera:boolean) {
    let sourceIn: CameraSource;

    if(fromCamera){
      sourceIn = CameraSource.Camera;
    }
    else{
      sourceIn = CameraSource.Photos;
    }

    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.DataUrl,
      source: sourceIn,
      quality: 100
    });

    //TODO Do firebase upload here

    const data = capturedPhoto.dataUrl ? capturedPhoto.dataUrl : "";
    this.imageString = data;
    return data;
  }
}
