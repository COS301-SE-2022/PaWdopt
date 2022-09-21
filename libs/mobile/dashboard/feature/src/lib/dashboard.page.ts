import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {Apollo, gql } from 'apollo-angular';
import { VarsFacade } from '@pawdopt/shared/data-store';
import { Storage } from '@capacitor/storage'
import { AlertController } from '@ionic/angular';
//import { owneddogsPageComponentModule } from '@pawdopt/mobile/owneddogs/feature';
@Component({
  selector: 'pawdopt-dashboard',
  templateUrl: 'dashboard.page.html',
  styleUrls: ['dashboard.page.scss', '../../../../../shared/styles/global.scss'],
  providers: [Apollo, VarsFacade],
})
export class dashboardPageComponent {

  dogID!: string; //from owned dogs page

  dog:{
    name:string,
    pic:string,
    organisation:string,
    about:string,
    height:number,
    weight:number,
    breed:string,
    temperament:string[],
    furLength:number
  }={
    name: '',
    pic: '',
    organisation: '',
    about: '',
    height: 0,  
    weight: 0,
    breed: '',
    temperament: [],
    furLength: 0
  };

  userLikes:{
    _id:string,
    name:string,
    pic:string,
  }[]=[];

  userId!: string;
  
  constructor(private router: Router, private apollo: Apollo,private varsFacade: VarsFacade, private alertController: AlertController ) {
    /*this.varsFacade.dogID$.subscribe(dogID => {
      this.dogID = dogID;
    });*/
    this.userId = "";
    this.getDog();
  }

  async _alert() {
    const alert = await this.alertController.create({
      header: 'User Rejection',
      subHeader: '',
      message: 'Are you sure you want to reject this user?',
      backdropDismiss: true,
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
          cssClass: 'my-alert-class',
          handler: (value:  any) => {
            console.log('ok clicked')
        }
      },
      {
        text: 'Cancel',
      }
    ]
    });
    await alert.present();
  }

  async getObject() {
    const ret = await Storage.get({ key: 'dogID' });
    if(ret.value){
      return JSON.parse(ret.value);
    }
  }

  async getDog(){
    this.userLikes = [];
    this.dogID = (await this.getObject()).name
    console.log(this.dogID);
    const getDogQuery = gql`query {
      findDogById(_id: "${this.dogID}") {
        name
        pics
        organisation {
          name
        }
        usersLiked{
          _id
          name
          pic
        }
        about
        height
        weight
        breed
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
        findDogById: {
          name: string,
          dob: Date,
          pics: string[],
          breed: string,
          about: string,
          height: number,
          weight: number,
          temperament: string[],
          furLength: number,
          usersLiked: {
            _id: string,
            name: string,
            pic: string
          }[],
          organisation: {
            name: string
          }
        }
      };
      console.log(data.findDogById.about)
      
      this.dog.name = data.findDogById.name;
      this.dog.pic = data.findDogById.pics[0];
      this.dog.organisation = data.findDogById.organisation.name;
      this.dog.about = data.findDogById.about;
      this.dog.height = data.findDogById.height;
      this.dog.weight = data.findDogById.weight;
      this.dog.breed = data.findDogById.breed;
      this.dog.temperament = data.findDogById.temperament;
      this.dog.furLength = data.findDogById.furLength;
      data.findDogById.usersLiked.forEach(element => {
        this.userLikes.push(
          {
            _id: element._id,
            name: element.name,
            pic: element.pic
          }
        );
      })
    })
  }
  clickedUserID!: string;



  async userinfo(id: string){
    // TODO Complete dashboard validation
    this.userId = id;
    await this.setObject();
    console.log(id);
    this.router.navigate(["/userinfo"]);
  }

  async heart(id:string){

    const alert = await this.alertController.create({
      header: 'Start Adoption Process?',
      subHeader: '',
      message: 'Are you sure you want to start the adoption process of this user?',
      backdropDismiss: true,
      buttons: [
        {
          text: 'Yes',
          role: 'cancel',
          cssClass: 'my-alert-class',
          handler: (value:  any) => {
            console.log("heart");
            const clickedHeartIconquery = gql`mutation {
              clickedHeartIcon(userId: "${id}", dogId: "${this.dogID}") {
                _id
              }
            }`;
            this.apollo.mutate({
              mutation: clickedHeartIconquery,
              fetchPolicy: 'no-cache'
            }).subscribe((result) => {
              console.log(result);
              this.getDog();
            }
            )
        }
      },
      {
        text: 'Cancel',
      }
    ]
    });
    await alert.present();
  }

  async trash(id:string){
    const alert = await this.alertController.create({
      header: 'User Rejection',
      subHeader: '',
      message: 'Are you sure you want to reject this user?',
      backdropDismiss: true,
      buttons: [
        {
          text: 'Yes',
          role: 'cancel',
          cssClass: 'my-alert-class',
          handler: (value:  any) => {
            console.log(id);
            const clickedTrashIconquery = gql`mutation {
              clickedTrashIcon(userId: "${id}", dogId: "${this.dogID}") {
                name
              }
            }`;
            this.apollo.mutate({
              mutation: clickedTrashIconquery,
              fetchPolicy: 'no-cache'
            }).subscribe((result) => {
              console.log(result);
              this.getDog();
            }
            )
        }
      },
      {
        text: 'Cancel',
      }
    ]
    });
    await alert.present();
  }

  async setObject() {
    await Storage.set({
    key: 'userId',
    value: JSON.stringify({
      uId: this.userId
      })
    });
  }

  home(){
    this.router.navigate(["/owneddogs"]);
  }

  likeddogs(){
    this.router.navigate(["/adoptionprocess"]);
  }

  profile(){
    this.router.navigate(["/userprofile"]);
  }

  preferences(){
    //this.router.navigate(["/userinfo"]); Not implemented yet
  }

  // addDog(){
  //   this.router.navigate(["/adddog"]);
  // }

}

