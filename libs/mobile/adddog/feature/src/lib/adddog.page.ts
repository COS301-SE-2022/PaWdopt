import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, LoadingController } from '@ionic/angular';
import {Apollo, gql } from 'apollo-angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';

// Capacitor Imports
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
// import { Filesystem, Directory } from '@capacitor/filesystem';
// import { Storage } from '@capacitor/storage';
// import { handleRetry } from '@nestjs/mongoose/dist/common/mongoose.utils';

@Component({
  selector: 'pawdopt-adddog',
  templateUrl: 'adddog.page.html',
  styleUrls: ['adddog.page.scss', '../../../../../shared/styles/global.scss'],
  providers: [Apollo],
})
export class AdddogPageComponent {
  constructor(private router: Router, public actionSheetController: ActionSheetController, private apollo : Apollo, private afAuth: AngularFireAuth, private loadingCtrl: LoadingController) {
    this.loading = this.loadingCtrl.create({
      message: 'Loading...',
    });
  }
  inputName!: string;
  inputBreed!: string;
  inputGender!: string;
  inputDOB!: Date;
  inputAbout!: string;
  inputFurlength!: string;
  inputTemperament!: string;

  orgId!: string;
  uid?: string;

  imageString!: string;

  inputHeight!: {
    lower: number;
    upper: number;
  };
  inputWeight!: {
    lower: number;
    upper: number;
  };

  loading: Promise<HTMLIonLoadingElement>;

  fieldvalidate(){
    //TODO: Make validation better
    //This checks if all fields are empty and then returns false
    let valid = true;
    if(this.inputName == null || this.inputName == ""){
      valid = false;
    }
    if(this.inputBreed == null || this.inputBreed == ""){
      valid = false;
    }
    if(this.inputDOB == null){
      valid = false;
    }
    if(this.inputAbout == null || this.inputAbout == ""){
      valid = false;
    }
    if(this.inputFurlength == null || this.inputFurlength == ""){
      valid = false;
    }
    if(this.inputTemperament == null || this.inputTemperament == ""){
      valid = false;
    }
    if(this.inputGender == null || this.inputGender == ""){
      valid = false;
    }
    return valid;
  }  

  async showLoading() {
    (await this.loading).present();
  }

  async hideLoading() {
    (await this.loading).dismiss();
  }


  addDog(){
    //Adds a dog to the database
    if(!this.fieldvalidate())
      return;
    this.afAuth.currentUser.then(user => {
      this.showLoading();
      this.uid = user?.uid;

      if(this.uid){
        //Query used to get the orgId
        const findOrgMemberByIdQuery = gql`query {
          findOrgMemberById(_id: "${this.uid}") {
            organisation 
          }
        }`;
  
        this.apollo.watchQuery({
          query: findOrgMemberByIdQuery,
          fetchPolicy: 'no-cache'
        }).valueChanges.subscribe((result) => {
          const data = result.data as {
            findOrgMemberById: {
              organisation: string;
            };
          };
          if (data.findOrgMemberById != null) {
            const orgId = data.findOrgMemberById.organisation;
            this.orgId = orgId;
          }
          let temp = '[';
          this.inputTemperament.replace(/\s/g, '').split(',').forEach(element => {
            temp += '"'+element + '",';
          });
          temp+= ']';
          
          const AddDogMutation = gql`mutation {
            createDog(dog: {
              _id: "new_id",
              name: "${this.inputName}",
              dob: "${this.inputDOB}",
              gender: "${this.inputGender}",
              pics : ["${this.imageString}"],
              breed: "${this.inputBreed}",
              about: "${this.inputAbout}",
              weight: ${this.inputWeight},
              height: ${this.inputHeight},
              furLength: "${this.inputFurlength}",
              temperament: ${temp}}, orgId:"${this.orgId}") {
                name
              }
            }`;
    
          this.apollo.mutate({
            mutation: AddDogMutation,
            fetchPolicy: 'no-cache'
            }).subscribe((result) => {
              this.hideLoading();
              this.router.navigate(["/owneddogs"]);
            }
          );
          
        });
      }
    });
  }

  Back(){
    this.router.navigate(["/owneddogs"]);
  }

  home(){
    this.router.navigate(["/owneddogs"]);
  }

  likeddogs(){
    this.router.navigate(["/adoptionprocess"]);
  }

  profile(){
    this.router.navigate(["/orgprofile"]);
  }

  preferences(){
    this.router.navigate(["/orgsettings"]); 
  }

  async uploadPic(){
    //Calls ML to get the breed of the dog
    const actionSheet = await this.actionSheetController.create({
      header: 'Upload picture',
      buttons: [{
        text: 'Take picture using your camera',
        icon: 'camera-outline',
        handler: () => {
          this.getPhoto(true).then(data => this.postToML(data)).then(result => {
            this.inputBreed = JSON.parse(result).breed;
          });
        }
      }, {
        text: 'Choose a picture from your gallery',
        icon: 'image-outline',
        handler: () => {
          this.getPhoto(false).then(data => this.postToML(data)).then(result => {
            this.inputBreed = JSON.parse(result).breed;
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

  async postToML(uri: string){
    let res: string;
    const data = uri.split(",");
    const type = data[0].split(";");
    const image_type = type[0].split("/");

    const headersList = {
    "Accept": "*/*",
    "Content-Type": "application/json"
      }



    const bodyContent ={
      image: data[1].replace(/\+/g, '-').replace(/\//g, '_'),
      extension: type[0]};

    return fetch("https://pawdopt.herokuapp.com/predict", {
      method: "POST",
      body: JSON.stringify(bodyContent),
      headers: headersList
    }).then(function(response) {
      return response.text();
    });
  }
}
