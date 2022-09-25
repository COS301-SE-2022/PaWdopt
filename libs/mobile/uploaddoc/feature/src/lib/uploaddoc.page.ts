import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {Apollo, gql} from 'apollo-angular';
import { ActionSheetController } from '@ionic/angular';
import { AngularFireAuth } from "@angular/fire/compat/auth";

import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
// import { Adopter, OrgMember } from 'libs/backend/shell/api/feature/src/lib/api.schema';
@Component({
  selector: 'pawdopt-uploaddoc',
  templateUrl: 'uploaddoc.page.html',
  styleUrls: ['uploaddoc.page.scss', '../../../../../shared/styles/global.scss'],
  providers: [Apollo]
})
export class uploaddocPageComponent {

  userID!: string;
  inputEmail!: string;
  inputPassword!: string;
  public static orgName:string;
  public static adopterEmail:string;
  imageIDString!: string;
  imagePORString!: string;
  imageBSString!: string;
  imageMLString!: string;
  imageToShow!: string;
  
  imageString!: string;

  constructor(private router: Router, private apollo: Apollo, private actionSheetController: ActionSheetController, private fireAuth: AngularFireAuth){
    this.imageIDString = "";
    this.imagePORString = "";
    this.imageBSString = "";
    this.imageMLString = "";
    //UserID from User Profile page

  }


  async getIDPhoto(fromCamera:boolean) {
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
    const data = capturedPhoto.dataUrl ? capturedPhoto.dataUrl : "";
    this.imageIDString = data;
    return data;
  }

  async getPORPhoto(fromCamera:boolean) {
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
    const data = capturedPhoto.dataUrl ? capturedPhoto.dataUrl : "";
    this.imagePORString = data;
    return data;
  }

  async getBSSPhoto(fromCamera:boolean) {
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
    const data = capturedPhoto.dataUrl ? capturedPhoto.dataUrl : "";
    this.imageBSString = data;
    return data;
  }

  async getMLPhoto(fromCamera:boolean) {
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
    const data = capturedPhoto.dataUrl ? capturedPhoto.dataUrl : "";
    this.imageMLString = data;
    return data;
  }

  async uploadPOR(){
    //upload document
    const actionSheet = await this.actionSheetController.create({
      header: 'Upload documents',
      buttons: [{
        text: 'Upload or take a picture using your camera',
        icon: 'camera-outline',
        handler: () => {
          console.log('Take picture clicked');
          this.getPORPhoto(true);
        }
      }, {
        text: 'Choose a picture from your gallery',
        icon: 'image-outline',
        handler: async () => {
          console.log('Choose a picture clicked');
          await this.getPORPhoto(false);
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

    this.fireAuth.currentUser.then(user => {
      console.log(user?.uid);
      if(user?.uid){
        this.userID = user.uid;
        console.log(this.userID);

        //call the uploaddoc query
        const uploadDocQuery = gql`
        mutation {
          uploadDoc(
            adopterId: "${this.userID}",
            type: "POR",
            path: "${this.imagePORString}"
          )

        }
      `;
      this.apollo.mutate({
        mutation: uploadDocQuery,
        fetchPolicy: 'no-cache'
      }).subscribe(({ data }) => {
        console.log('got data', data);
      },(error) => {
        console.log('there was an error sending the query', error);
      });

      }
    });

    

    const { role, data } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role and data', role, data);
  }

  async uploadBSS(){
    //upload document
    const actionSheet = await this.actionSheetController.create({
      header: 'Upload documents',
      buttons: [{
        text: 'Upload or take a picture using your camera',
        icon: 'camera-outline',
        handler: () => {
          console.log('Take picture clicked');
          this.getBSSPhoto(true);
        }
      }, {
        text: 'Choose a picture from your gallery',
        icon: 'image-outline',
        handler: async () => {
          console.log('Choose a picture clicked');
          await this.getBSSPhoto(false);
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

    this.fireAuth.currentUser.then(user => {
      console.log(user?.uid);
      if(user?.uid){
        this.userID = user.uid;
        console.log(this.userID);
        //call the uploaddoc query
    const uploadDocQuery = gql`
    mutation {
      uploadDoc(
        adopterId: "${this.userID}",
        type: "BSS",
        path: "${this.imageBSString}"
      )

    }
  `;
  this.apollo.mutate({
    mutation: uploadDocQuery,
    fetchPolicy: 'no-cache'
  }).subscribe(({ data }) => {
    console.log('got data', data);
  },(error) => {
    console.log('there was an error sending the query', error);
  });
      }
    });

    


    const { role, data } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role and data', role, data);
  }


  async uploadML(){
    //upload document
    const actionSheet = await this.actionSheetController.create({
      header: 'Upload documents',
      buttons: [{
        text: 'Upload or take a picture using your camera',
        icon: 'camera-outline',
        handler: () => {
          console.log('Take picture clicked');
          this.getMLPhoto(true);
        }
      }, {
        text: 'Choose a picture from your gallery',
        icon: 'image-outline',
        handler: async () => {
          console.log('Choose a picture clicked');
          await this.getMLPhoto(false);
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

    this.fireAuth.currentUser.then(user => {
      console.log(user?.uid);
      if(user?.uid){
        this.userID = user.uid;
        console.log(this.userID);
        //call the uploaddoc query
    const uploadDocQuery = gql`
    mutation {
      uploadDoc(
        adopterId: "${this.userID}",
        type: "ML",
        path: "${this.imageMLString}"
      )

    }
  `;
  this.apollo.mutate({
    mutation: uploadDocQuery,
    fetchPolicy: 'no-cache'
  }).subscribe(({ data }) => {
    console.log('got data', data);
  },(error) => {
    console.log('there was an error sending the query', error);
  });
      }
    });

    


    const { role, data } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role and data', role, data);
  }

  async uploadID(){
    //upload document
    const actionSheet = await this.actionSheetController.create({
      header: 'Upload documents',
      buttons: [{
        text: 'Upload or take a picture using your camera',
        icon: 'camera-outline',
        handler: () => {
          console.log('Take picture clicked');
          this.getIDPhoto(true);
        }
      }, {
        text: 'Choose a picture from your gallery',
        icon: 'image-outline',
        handler: async () => {
          console.log('Choose a picture clicked');
          await this.getIDPhoto(false);
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

    //get the currently logged in user id
    this.fireAuth.currentUser.then(user => {
      console.log(user?.uid);
      if(user?.uid){
        this.userID = user.uid;
        console.log(this.userID);

        //call the uploaddoc query
    const uploadDocQuery = gql`
    mutation {
      uploadDoc(
        adopterId: "${this.userID}",
        type: "ID",
        path: "${this.imageIDString}"
      )

    }
  `;
  this.apollo.mutate({
    mutation: uploadDocQuery,
    fetchPolicy: 'no-cache'
  }).subscribe(({ data }) => {
    console.log('got data', data);
  },(error) => {
    console.log('there was an error sending the query', error);
  });
      }
    });

    const { role, data } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role and data', role, data);
  }

  deleteID(){
    //delete account
    this.imageIDString = "";
  }

  deletePOR(){
    //delete account
    this.imagePORString = "";
  }

  deleteBSS(){
    //delete account
    this.imageBSString = "";
  }

  deleteML(){
    //delete account
    this.imageMLString = "";
  }

  signup(){
    // Done in signup
    this.router.navigate(["/signup"]);
  }
  
  addorg(){
    this.router.navigate(["/addorg"]);
  }

  home(){
    this.router.navigate(["/owneddogs"]);
  }

  likeddogs(){
    this.router.navigate(["/userlikes"]);
  }

  profile(){
    this.router.navigate(["/userprofile"]);
  }

  preferences(){
    //this.router.navigate(["/userinfo"]); Not implemented yet
  }

  back(){
    this.router.navigate(["/userprofile"]);
  }

}
