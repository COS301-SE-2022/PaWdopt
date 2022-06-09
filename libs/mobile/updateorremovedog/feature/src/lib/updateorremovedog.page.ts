import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { Apollo, gql } from 'apollo-angular';
@Component({
  selector: 'pawdopt-updateorremovedog',
  templateUrl: 'updateorremovedog.page.html',
  styleUrls: ['updateorremovedog.page.scss', '../../../../../shared/styles/global.scss'],
})
export class updateorremovedogPageComponent {


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

  
  constructor(private router: Router, public actionSheetController: ActionSheetController, private apollo: Apollo ){
    this.loadDog();
  }

  dog:{
    name:string,
    gender:string,
    breed:string,
    dob:string,
    about:string,
    height:number,
    weight:number,
    furlength:string,
    temperament:string[]

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
      findDog(name: "Millie"){
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
    //update the dogs breed from name in form to newBreed
    // const updateDogQuery = gql`mutation {
    //   updateDogBreed(dogName: "Millie", breed: "${this.newBreed}"){
    //     name
    //     breed
    //   }
    // }`;
    // this.apollo.mutate({
    //   mutation: updateDogQuery,
    //   fetchPolicy: 'no-cache'
    // }).subscribe((result) => {
    //   console.log(result);
    // });

    // //update the dogs about from name in form to newAbout
    // const updateDogAboutQuery = gql`mutation {
    //   updateDogAbout(dogName: "Millie", about: "${this.newAbout}"){
    //     name
    //     about
    //     }
    //   }`;
    // this.apollo.mutate({
    //   mutation: updateDogAboutQuery,
    //   fetchPolicy: 'no-cache'
    // }).subscribe((result) => {
    //   console.log(result);
    // }
    // );
    // //update the dogs dob from name in form to newDob
    // // const updateDogDobQuery = gql`mutation {
    // //   updateDogDob(dogName: "Millie", dob: "${this.newDob}"){
    // //     name
    // //     dob
    // //   }
    // // }`;
    // // this.apollo.mutate({
    // //   mutation: updateDogDobQuery,
    // //   fetchPolicy: 'no-cache'
    // // }).subscribe((result) => {
    // //   console.log(result);
    // // }
    // // );
    // //update the dogs height from name in form to newHeight
    // const updateDogHeightQuery = gql`mutation {
    //   updateDogHeight(dogName: "Millie", height: "${this.newHeight}"){
    //     name
    //     height
    //     }
    //   }`;
    // this.apollo.mutate({
    //   mutation: updateDogHeightQuery,
    //   fetchPolicy: 'no-cache'
    // }).subscribe((result) => {
    //   console.log(result);
    // }
    // );
    // //update the dogs weight from name in form to newWeight
    // const updateDogWeightQuery = gql`mutation {
    //   updateDogWeight(dogName: "Millie", weight: "${this.newWeight}"){
    //     name
    //     weight
    //   }
    // }`;
    // this.apollo.mutate({
    //   mutation: updateDogWeightQuery,
    //   fetchPolicy: 'no-cache'
    // }).subscribe((result) => {
    //   console.log(result);
    // }
    // );
    // //update the dogs furlength from name in form to newFurlength
    // const updateDogFurlengthQuery = gql`mutation {
    //   updateDogFurLength(dogName: "Millie", furLength: "${this.newFurlength}"){
    //     name
    //     furLength
    //   }
    // }`;
    // this.apollo.mutate({
    //   mutation: updateDogFurlengthQuery,
    //   fetchPolicy: 'no-cache'
    // }).subscribe((result) => {
    //   console.log(result);
    // }
    // );
    // //update the dogs gender from name in form to newGender
    // const updateDogGenderQuery = gql`mutation {
    //   updateDogGender(dogName: "Millie", gender: "${this.newGender}"){
    //     name
    //     gender
    //   }
    // }`;
    // this.apollo.mutate({
    //   mutation: updateDogGenderQuery,
    //   fetchPolicy: 'no-cache'
    // }).subscribe((result) => {
    //   console.log(result);
    // });
    this.router.navigate(["/owneddogs"]);
  }

  deleteDog(){//delete whats in name value in form
    const deleteDogQuery = gql`mutation {
      deleteDog(dogName: "Millie"){
        name
      }
    }`;
    this.apollo.mutate({
      mutation: deleteDogQuery,
      fetchPolicy: 'no-cache'
    }).subscribe((result) => {
      console.log(result);
    })
    this.router.navigate(["/owneddogs"]);
  };



  // login(){
  //   // TODO Complete login validation
  //   console.log("login validation");
    
  //   this.router.navigate(["/home"]);
  // }

  // signup(){
  //   // TODO Complete login validation
  //   console.log("login validation");
    
  //   this.router.navigate(["/signup"]);
  // }
  // addorg(){
  //   // TODO Complete login validation
  //   console.log("login validation");
    
  //   this.router.navigate(["/addorg"]);
  // }



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

}

