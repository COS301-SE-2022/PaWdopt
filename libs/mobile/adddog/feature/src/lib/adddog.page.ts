import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import {Apollo, gql } from 'apollo-angular';
@Component({
  selector: 'pawdopt-adddog',
  templateUrl: 'adddog.page.html',
  styleUrls: ['adddog.page.scss', '../../../../../shared/styles/global.scss'],
  providers: [Apollo],
})
export class AdddogPageComponent {
  constructor(private router: Router, public actionSheetController: ActionSheetController, private apollo : Apollo) {}
  
  inputName!: string;
  inputBreed!: string;
  inputGender!: string;
  inputDOB!: Date;
  inputAbout!: string;
  inputHeight!: number;
  inputWeight!: number;
  inputFurlength!: string;
  inputTemperament!: string;

  orgName!: string;
  orgEmail!: string;


  addDog(){
    //Query used to get the orgName
    const findOrgMemberByEmailQuery = gql`query {
      findOrgMemberByEmail(email: "${this.orgEmail}") {
        organisation 
      }
    }`;

    this.apollo.watchQuery({
      query: findOrgMemberByEmailQuery,
      fetchPolicy: 'no-cache'
    }).valueChanges.subscribe((result) => {
      const data = result.data as {
        findOrgMemberByEmail: {
          organisation: string;
        };
      };
      if (data.findOrgMemberByEmail != null) {
        const orgName = data.findOrgMemberByEmail.organisation;
        this.orgName = orgName;
        console.log(this.orgName);
      }
    }
    );


    // pass it through to the mutation query
    const AddDogMutation = gql`mutation {
      addDog(dog: {
        name: "${this.inputName}",
        dob: "${this.inputDOB}",
        gender: "${this.inputGender}",
        pics : ["firebaseID"],
        breed: "${this.inputBreed}",
        about: "${this.inputAbout}",
        weight: "${this.inputWeight}",
        height: "${this.inputHeight}",
        furlength: "${this.inputFurlength}",
        temperament: "${this.inputTemperament}"}, "${this.orgName}") {
          name
        }`;

    this.apollo.mutate({
      mutation: AddDogMutation,
      fetchPolicy: 'no-cache'
      }).subscribe((result) => {
        console.log(result);
      }
    );

  }
  Back(){
    // TODO Complete add dog validation
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
    //this.router.navigate(["/orgsettings"]); Not implemented yet
  }

  
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
