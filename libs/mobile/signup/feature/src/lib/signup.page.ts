import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {Apollo, gql } from 'apollo-angular';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { ActionSheetController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

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
  email!: string;

  uid: string;
  imageToShow!: string;
  
  imageString!: string;

  constructor(private router: Router, private apollo: Apollo, private fireAuth: AngularFireAuth, private actionSheetController: ActionSheetController, private alertController: AlertController) {
    this.uid = "";
    this.imageToShow = "";
    this.imageString = "";
  }
  
  
  signUp(){
    if(!this.validate()){
      return;
    }

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

  async validate(){
    let valid = true;
    if(this.uName == null || this.uName == ""){
      const alert = await this.alertController.create({
        header: 'Alert',
        subHeader: 'Username is empty',
        message: 'Please enter a username',
        buttons: ['OK'],
      });
      await alert.present();
      valid = false;
    }

    if(this.pass == null || this.pass == "" || this.pass.length < 6 || this.pass.length > 20 || !this.checkPassword() || !this.checkNumber() || !this.checkUpper() || !this.checkLower()){
      const alert = await this.alertController.create({
        header: 'Alert',
        subHeader: 'Password is invalid',
        message: 'Password must be between 6 and 20 characters, contain at least one uppercase letter, one lowercase letter, one number, and one special character',
        buttons: ['OK'],
      });
      await alert.present();
      valid = false;
    }
    if(this.rePass == null || this.rePass == "" || this.rePass != this.pass){
      const alert = await this.alertController.create({
        header: 'Alert',
        subHeader: 'Passwords do not match',
        message: 'Please re-enter your password',
        buttons: ['OK'],
      });
      await alert.present();
      valid = false;
    }
    if(this.email == null || this.email == "" || !this.email.includes("@") || !this.email.includes(".")){
      //alex/chris finish this up
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

  //function to show the image that is uploaded 
  showImage(){
    return this.imageString;
  }

  //function to check if the password contains a special character
  checkPassword(){
    if(this.pass.includes("!") || this.pass.includes("@") || this.pass.includes("#") || this.pass.includes("$") || this.pass.includes("%") || this.pass.includes("^") || this.pass.includes("&") || this.pass.includes("*") || this.pass.includes("(") || this.pass.includes(")") || this.pass.includes("-") || this.pass.includes("_") || this.pass.includes("+") || this.pass.includes("=") || this.pass.includes("{") || this.pass.includes("}") || this.pass.includes("[") || this.pass.includes("]") || this.pass.includes(":") || this.pass.includes(";") || this.pass.includes("'") || this.pass.includes("<") || this.pass.includes(">") || this.pass.includes("?") || this.pass.includes("/") || this.pass.includes("|")){
      return true;
    }
    else{
      return false;
    }
  }

  //function to check if the password contains a number
  checkNumber(){
    if(this.pass.includes("0") || this.pass.includes("1") || this.pass.includes("2") || this.pass.includes("3") || this.pass.includes("4") || this.pass.includes("5") || this.pass.includes("6") || this.pass.includes("7") || this.pass.includes("8") || this.pass.includes("9")){
      return true;
    }
    else{
      return false;
    }
  }

  //function to check if the password contains an uppercase letter
  checkUpper(){
    if(this.pass.includes("A") || this.pass.includes("B") || this.pass.includes("C") || this.pass.includes("D") || this.pass.includes("E") || this.pass.includes("F") || this.pass.includes("G") || this.pass.includes("H") || this.pass.includes("I") || this.pass.includes("J") || this.pass.includes("K") || this.pass.includes("L") || this.pass.includes("M") || this.pass.includes("N") || this.pass.includes("O") || this.pass.includes("P") || this.pass.includes("Q") || this.pass.includes("R") || this.pass.includes("S") || this.pass.includes("T") || this.pass.includes("U") || this.pass.includes("V") || this.pass.includes("W") || this.pass.includes("X") || this.pass.includes("Y") || this.pass.includes("Z")){
      return true;
    }
    else{
      return false;
    }
  }

  //function to check if the password contains a lowercase letter
  checkLower(){
    if(this.pass.includes("a") || this.pass.includes("b") || this.pass.includes("c") || this.pass.includes("d") || this.pass.includes("e") || this.pass.includes("f") || this.pass.includes("g") || this.pass.includes("h") || this.pass.includes("i") || this.pass.includes("j") || this.pass.includes("k") || this.pass.includes("l") || this.pass.includes("m") || this.pass.includes("n") || this.pass.includes("o") || this.pass.includes("p") || this.pass.includes("q") || this.pass.includes("r") || this.pass.includes("s") || this.pass.includes("t") || this.pass.includes("u") || this.pass.includes("v") || this.pass.includes("w") || this.pass.includes("x") || this.pass.includes("y") || this.pass.includes("z")){
      return true;
    }
    else{
      return false;
    }
  }


}