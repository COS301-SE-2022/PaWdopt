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
  uselessVariable = 0;

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
          this.getPORPhoto(true);
        }
      }, {
        text: 'Choose a picture from your gallery',
        icon: 'image-outline',
        handler: async () => {
          await this.getPORPhoto(false);

          this.fireAuth.currentUser.then(user => {
            if(user?.uid){
              this.userID = user.uid;
      
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
              this.uselessVariable = 1;
            });      
            }
          });
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
      }]
    });
    await actionSheet.present();

    

    

  }

  async uploadBSS(){
    //upload document
    const actionSheet = await this.actionSheetController.create({
      header: 'Upload documents',
      buttons: [{
        text: 'Upload or take a picture using your camera',
        icon: 'camera-outline',
        handler: () => {
          this.getBSSPhoto(true);
        }
      }, {
        text: 'Choose a picture from your gallery',
        icon: 'image-outline',
        handler: async () => {
          await this.getBSSPhoto(false);

          this.fireAuth.currentUser.then(user => {
            if(user?.uid){
              this.userID = user.uid;
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
          this.uselessVariable = 1;
        }); 
            }
          });
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
      }]
    });
    await actionSheet.present();

   

  }


  async uploadML(){
    //upload document
    const actionSheet = await this.actionSheetController.create({
      header: 'Upload documents',
      buttons: [{
        text: 'Upload or take a picture using your camera',
        icon: 'camera-outline',
        handler: () => {
          this.getMLPhoto(true);
        }
      }, {
        text: 'Choose a picture from your gallery',
        icon: 'image-outline',
        handler: async () => {
          await this.getMLPhoto(false);
          this.fireAuth.currentUser.then(user => {
            if(user?.uid){
              this.userID = user.uid;
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
          this.uselessVariable = 1;
        }); 
            }
          });
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
      }]
    });
    await actionSheet.present();

    

    

  }

  async uploadID(){
    //upload document
    const actionSheet = await this.actionSheetController.create({
      header: 'Upload documents',
      buttons: [{
        text: 'Upload or take a picture using your camera',
        icon: 'camera-outline',
        handler: () => {
          this.getIDPhoto(true);
        }
      }, {
        text: 'Choose a picture from your gallery',
        icon: 'image-outline',
        handler: async () => {
          await this.getIDPhoto(false);

          //get the currently logged in user id
    this.fireAuth.currentUser.then(user => {
      if(user?.uid){
        this.userID = user.uid;

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
    this.uselessVariable = 1;
  }); 
      }
    });
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
      }]
    });
    await actionSheet.present();

    

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

  back(){
    this.router.navigate(["/userprofile"]);
  }

  gotoChat(){
    this.router.navigate(["/chatlist"]);
  }
}
