import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {Apollo, gql } from 'apollo-angular';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { ActionSheetController } from '@ionic/angular';

import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Storage } from '@capacitor/storage';
import { handleRetry } from '@nestjs/mongoose/dist/common/mongoose.utils';

@Component({
  selector: 'pawdopt-signup',
  templateUrl: 'signup.page.html',
  styleUrls: ['signup.page.scss', '../../../../../shared/styles/global.scss'],
  providers: [Apollo, AngularFireAuth],
})
export class SignupPageComponent {
  uName!: string;
  pass!: string;
  rePass!: string;
  idnum!: string;
  email!: string;

  uid: string;
  
  imageString!: string;

  constructor(private router: Router, private apollo: Apollo, private fireAuth: AngularFireAuth, private actionSheetController: ActionSheetController) {
    this.uid = "";
    this.imageString = "";
  }
  
  
  signUp(){
    if(!this.validate())
      return;

    this.fireAuth.createUserWithEmailAndPassword(this.email, this.pass).then((user) => {
      console.log("User created");
      console.log(user);
      user.user?.updateProfile({
        displayName: this.uName,
      });
      this.addUser(user.user?.uid);
    }).catch((error) => {
      console.log(error);
      //TODO: Toast error message
    });

    // this.fireAuth.currentUser.then((user) => {
    //   console.log(user?.uid);
    // });
    //TODO: Complete login validation
    
  }

  addUser(uid?: string){
    const addUser = gql`mutation {
      createAdopter(adopter: {
        _id: "${uid}",
        name: "${this.uName}",
        email: "${this.email}",
        IDNum: "${this.idnum}",
        pic: "${this.imageString}",
        uploadedDocs: false,
      })
      {
        name
      }
    }`;
    this.apollo.mutate({
      mutation: addUser,
    }).subscribe(({data}) => {
      console.log('got data', data);
      this.router.navigate(["/home"]);
    });
  }

  back(){
    // Takes the user to the login page
    console.log("moving to login");
    this.router.navigate(["/login"]);
  }

  validate(){
    //TODO: Make validation better
    let valid = true;
    if(this.uName == null || this.uName == ""){
      valid = false;
    }
    if(this.pass == null || this.pass == ""){
      valid = false;
    }
    if(this.rePass == null || this.rePass == "" || this.rePass != this.pass){
      valid = false;
    }
    if(this.idnum == null || this.idnum == "" || this.idnum.length != 13){
      valid = false;
    }
    if(this.email == null || this.email == "" || !this.email.includes("@") || !this.email.includes(".")){
      valid = false;
    }
    return valid;
  }  

  async uploadPic(){
    const actionSheet = await this.actionSheetController.create({
      header: 'Upload picture',
      buttons: [{
        text: 'Take picture using your camera',
        icon: 'camera-outline',
        handler: () => {
          console.log('Take picture clicked');
          this.getPhoto(true);
        }
      }, {
        text: 'Choose a picture from your gallery',
        icon: 'image-outline',
        handler: () => {
          console.log('Choose a picture clicked');
          this.getPhoto(false);
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();

    const { role, data } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role and data', role, data);
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