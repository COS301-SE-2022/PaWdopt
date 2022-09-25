import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { Apollo, gql } from 'apollo-angular';
import { Storage } from '@capacitor/storage';


@Component({
  selector: 'pawdopt-updateorremovedog',
  templateUrl: 'updateorremovedog.page.html',
  styleUrls: ['updateorremovedog.page.scss', '../../../../../shared/styles/global.scss'],
  providers: [Apollo]
})
export class updateorremovedogPageComponent {

  dogID!: string;
  inputBreed!: string;
  inputGender!: string;
  inputDob!: string;
  inputAbout!: string;
  loadHeight!: number;
  loadWeight!: number;
  inputHeight!: {
    lower: number;
    upper: number;
  };
  inputWeight!: {
    lower: number;
    upper: number;
  };
  inputFurlength!: string;
  inputTemperament!: string;
  
  constructor(private router: Router, public actionSheetController: ActionSheetController, private apollo: Apollo){
    this.loadDog();
  }

  fieldvalidate(){
    //TODO: Make validation better
    let valid = true;
    if(this.inputBreed == null || this.inputBreed == ""){
      valid = false;
    }
    if(this.inputDob == null){
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

  async getObject() {
    const ret = await Storage.get({ key: 'dogID' });
    if(ret.value){
      return JSON.parse(ret.value);
    }
  }

  dog:{
    name: string,
    dob: string,
    breed: string,
    gender: string,
    about: string,
    height: number,
    weight: number,
    furlength: string,
    temperament: string[]
  }={
    name:'',
    gender:'',
    breed:'',
    dob: '',
    about:'',
    height:0,
    weight:0,
    furlength:'',
    temperament:[]
  }

  temperamentString = "";

  async loadDog(){

    this.dogID = (await this.getObject()).name;
    const getDogQuery = gql`query {
      findDogById(_id: "${this.dogID}"){
        name
        dob
        breed
        gender
        breed
        about
        weight
        height
        temperament
        furLength
      }
    }`;
    this.apollo.watchQuery({
      query: getDogQuery,
      fetchPolicy: 'no-cache'
    }).valueChanges.subscribe((result) => {
      const data = result.data as {
        findDogById: {
          name: string,
          dob: Date,
          gender: string,
          breed: string,
          about: string,
          height: number,
          weight: number,
          temperament: string[],
          furLength: string
        }
      }

        // this.inputName = data.findDogById.name;
        this.inputAbout = data.findDogById.about;
        const tempDate = new Date(data.findDogById.dob); 
        this.inputDob = (tempDate.getFullYear() + "-" + (tempDate.getMonth() + 1) + "-" + tempDate.getDate()).toString();
        this.inputGender = data.findDogById.gender;
        this.loadHeight = data.findDogById.height; 
        this.loadWeight = data.findDogById.weight; 
        this.inputBreed = data.findDogById.breed;
        this.dog.temperament = data.findDogById.temperament;
        this.inputFurlength = data.findDogById.furLength;

        //list all elements in temperament into temperamentString
        this.temperamentString = "";
        for(let i = 0; i < this.dog.temperament.length; i++){
          this.temperamentString += this.dog.temperament[i];
          if(i!=this.dog.temperament.length-1){
            this.temperamentString += ", ";
          }
        }
        this.inputTemperament = this.temperamentString;
      }
    )
  }



  updateDog(){
    
    if(!this.fieldvalidate())
    return;
    
    let temperamentString1 = "";
    const temperament = this.inputTemperament.replace(/\s+/g, "").split(",");
    temperament.forEach(element => {
      temperamentString1 += '"' + element + '",'; 
      
    });
    
    const updateDogQuery = gql`mutation {
      updateDog(
        dogId: "${this.dogID}",
        breed: "${this.inputBreed}",
        gender: "${this.inputGender}",
        dob: "${this.inputDob}",
        about: "${this.inputAbout}",
        height: ${this.inputHeight},
        weight: ${this.inputWeight},
        furlength: "${this.inputFurlength}",
        temperament: [${temperamentString1}])
      {
        _id
      }
    }`;
    this.apollo.mutate({
      mutation: updateDogQuery,
      fetchPolicy: 'no-cache'
    }).subscribe((result) => {
      this.router.navigate(["/owneddogs"]);
    }
    );
  }

  deleteDog(){//delete the clicked on dog
    const deleteDogQuery = gql`mutation {
      deleteDog(dogId: "${this.dogID}"){
        name
      }
    }`;
    this.apollo.mutate({
      mutation: deleteDogQuery,
      fetchPolicy: 'no-cache'
    }).subscribe((result) => {
      this.router.navigate(["/owneddogs"]);
    })
  };

  home(){
    this.router.navigate(["/owneddogs"]);
  }

  back(){
    this.router.navigate(["/owneddogs"]);
  }

  likeddogs(){
    this.router.navigate(["/dashboard"]);
  }

  profile(){
    this.router.navigate(["/orgprofile"]);
  }

  preferences(){
    //this.router.navigate(["/userinfo"]); 
  }


  // async uploadPic(){
  //   const actionSheet = await this.actionSheetController.create({
  //     header: 'Upload picture',
  //     buttons: [{
  //       text: 'Take picture using your camera',
  //       icon: 'camera-outline',
  //       handler: () => {
  //         console.log('Take picture clicked');
  //       }
  //     }, {
  //       text: 'Choose a picture from your gallery',
  //       icon: 'image-outline',
  //       handler: () => {
  //         console.log('Choose a picture clicked');
  //       }
  //     }, {
  //       text: 'Cancel',
  //       icon: 'close',
  //       role: 'cancel',
  //       handler: () => {
  //         console.log('Cancel clicked');
  //       }
  //     }]
  //   });
  //   await actionSheet.present();

  //   const { role, data } = await actionSheet.onDidDismiss();
  //   console.log('onDidDismiss resolved with role and data', role, data);
  // }
  async uploadPic(){
    const actionSheet = await this.actionSheetController.create({
      header: 'Upload picture',
      buttons: [{
        text: 'Take picture using your camera',
        icon: 'camera-outline',
        handler: () => {
          console.log('Take picture clicked');
        }
      }, {
        text: 'Choose a picture from your gallery',
        icon: 'image-outline',
        handler: () => {
          console.log('Choose a picture clicked');
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
}

