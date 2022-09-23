import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {Apollo} from 'apollo-angular';
import { ActionSheetController } from '@ionic/angular';

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

  constructor(private router: Router, private apollo: Apollo, private actionSheetController: ActionSheetController){
    this.imageIDString = "";
    this.imagePORString = "";
    this.imageBSString = "";
    this.imageMLString = "";
    //UserID from User Profile page

  }

  showImage(){
    // TODO: unhide pic
    return this.imageString;
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
    const data = capturedPhoto.dataUrl ? capturedPhoto.dataUrl : "";
    this.imageString = data;
    return data;
  }

  async upload(){
    //upload document
    const actionSheet = await this.actionSheetController.create({
      header: 'Upload documents',
      buttons: [{
        text: 'Upload or take a picture using your camera',
        icon: 'camera-outline',
        handler: () => {
          console.log('Take picture clicked');
          this.getPhoto(true);
        }
      }, {
        text: 'Choose a picture from your gallery',
        icon: 'image-outline',
        handler: async () => {
          console.log('Choose a picture clicked');
          await this.getPhoto(false);
          this.imageToShow = this.showImage();
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

  delete(){
    //delete account
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

