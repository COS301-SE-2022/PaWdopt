import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { Apollo, gql } from 'apollo-angular';
import { VarsFacade } from '@pawdopt/shared/data-store';
@Component({
  selector: 'pawdopt-updateorremovedog',
  templateUrl: 'updateorremovedog.page.html',
  styleUrls: ['updateorremovedog.page.scss', '../../../../../shared/styles/global.scss'],
  providers: [Apollo, VarsFacade]
})
export class updateorremovedogPageComponent {

  dogID!: string;
  inputBreed!: string;
  inputGender!: string;
  inputDob!: Date;
  inputAbout!: string;
  inputHeight!: number;
  inputWeight!: number;
  inputFurlength!: string;
  inputTemperament!: string;

  newBreed = this.inputBreed;
  newGender = this.inputGender;
  newDob = this.inputDob;
  newAbout = this.inputAbout;
  newHeight = this.inputHeight;
  newWeight = this.inputWeight;
  newFurlength = this.inputFurlength;
  newTemperament = this.inputTemperament;
  
  constructor(private router: Router, public actionSheetController: ActionSheetController, private apollo: Apollo, private varsFacade: VarsFacade ){
    this.varsFacade.dogID$.subscribe(dogID => {
      this.dogID = dogID;
    });
    this.loadDog();
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

  loadDog(){
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
      console.log(result);
      const data = result.data as {
        findDog: {
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
      };
      
      this.dog.name = data.findDog.name;
      this.dog.about = data.findDog.about;
      const tempDate = new Date(data.findDog.dob); 
      this.dog.dob = tempDate.toDateString();
      this.dog.gender = data.findDog.gender;
      this.dog.height = data.findDog.height;
      this.dog.weight = data.findDog.weight;
      this.dog.breed = data.findDog.breed;
      this.dog.temperament = data.findDog.temperament;
      this.dog.furlength = data.findDog.furLength;

      //list all elements in temperament into temperamentString
      this.temperamentString = "";
      for(let i = 0; i < this.dog.temperament.length; i++){
        this.temperamentString += this.dog.temperament[i];
        if(i!=this.dog.temperament.length-1){
          this.temperamentString += ", ";
        }
      }
    });
  }


  updateDog(){
  
    const updateDogQuery = gql`mutation {
      updateDog(
        _id: "${this.dogID}",
        breed: "${this.newBreed}",
        gender: "${this.newGender}",
        dob: "${this.newDob}",
        about: "${this.newAbout}",
        height: "${this.newHeight}",
        weight: "${this.newWeight}",
        furlength: "${this.newFurlength}",
        temperament: "${this.newTemperament}")
      {
        _id
      }
    }`;
    this.apollo.mutate({
      mutation: updateDogQuery,
      fetchPolicy: 'no-cache'
    }).subscribe((result) => {
      console.log(result);
      this.router.navigate(["/owneddogs"]);
    }
    );
  }

  deleteDog(){//delete the clicked on dog
    const deleteDogQuery = gql`mutation {
      deleteDog(_id: "${this.dogID}")){
        name
      }
    }`;
    this.apollo.mutate({
      mutation: deleteDogQuery,
      fetchPolicy: 'no-cache'
    }).subscribe((result) => {
      console.log(result);
      this.router.navigate(["/owneddogs"]);
    })
  };

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
    //this.router.navigate(["/userinfo"]); Not implemented yet
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

