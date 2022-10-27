import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {Apollo, gql } from 'apollo-angular';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Storage } from '@capacitor/storage';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'pawdopt-adoptionprocess',
  templateUrl: 'adoptionprocess.page.html',
  styleUrls: ['adoptionprocess.page.scss', '../../../../../shared/styles/global.scss'],
  providers: [Apollo, AngularFireAuth]
})
export class adoptionprocessPageComponent {

  orgId!:string;
  adopterEmail!:string;

  listedAdoptions:{
    _idUser: string;
    _idDog: string;
    nameUser: string;
    nameDog: string;
    picsUser: string;
    picsDog: string;
  }[] = [];
  loading: Promise<HTMLIonLoadingElement>;

  constructor(private router: Router, private apollo: Apollo, private afAuth: AngularFireAuth, private loadingCtrl: LoadingController,private alertController: AlertController){
    this.loading = this.loadingCtrl.create({
      message: 'Loading...',
    });
    
  }

  async ionViewWillEnter(){
    this.listedAdoptions=[];
    this.getAdoptions();
  }

  async showLoading() {
    (await this.loading).present();
  }

  async hideLoading() {
    (await this.loading).dismiss();
  }

  getAdoptions(){
    this.afAuth.currentUser.then(user => {
      this.showLoading();
      if(user?.uid){
        const findOrgMemberByIdQuery = gql`query {
          findOrgMemberById(_id: "${user?.uid}") {
            _id
            organisation
          }
        }`

        this.apollo.watchQuery({
          query: findOrgMemberByIdQuery,
          fetchPolicy: 'no-cache'
        }).valueChanges.subscribe((result) => {
          const data = result.data as {
            findOrgMemberById: {
              _id: string;
              organisation: string;
            }
          }
          if(data.findOrgMemberById){
          this.orgId = data.findOrgMemberById.organisation;
          }

          const getOrgByNameQuery = gql`
            query { findOrgById(_id: "${this.orgId}") {
              potentialAdopters{
                dogId
                adopter {
                  _id
                  name
                  pic
                }
              }
            }
            }`
          this.apollo.watchQuery({
            query: getOrgByNameQuery,
            fetchPolicy: 'no-cache'
          }).valueChanges.subscribe((result) => {
            const data = result.data as {
              findOrgById: {
                potentialAdopters: {
                  dogId: string;
                  adopter: {
                    _id: string;
                    name: string;
                    pic: string;
                  }
                }[]
              }
            };
            if(data.findOrgById){
              if(data.findOrgById.potentialAdopters == null){
                this.hideLoading();
              }
            data.findOrgById.potentialAdopters.forEach(adopter => {
              const getDogByIdQuery = gql`
                query { findDogById(_id: "${adopter.dogId}") {
                  _id
                  name
                  pics
                }
                }`
              this.apollo.watchQuery({
                query: getDogByIdQuery,
                fetchPolicy: 'no-cache'
              }).valueChanges.subscribe((result) => {
                const data = result.data as {
                  findDogById: {
                    _id: string;
                    name: string;
                    pics: string[];
                  }
                };
                this.listedAdoptions.push({
                  _idUser: adopter.adopter._id,
                  _idDog: data.findDogById._id,
                  nameUser: adopter.adopter.name,
                  nameDog: data.findDogById.name,
                  picsUser: adopter.adopter.pic,
                  picsDog: data.findDogById.pics[0]
                });
                this.hideLoading();
              })
            })
          }
          this.hideLoading();
          })
        })
      }
    })
  }


  clickedSwiper(userId: string, dogID: string){
    this.setObject(userId, dogID);
    this.router.navigate(["/useradoption"]);
  }

  async setObject(userId: string, dogID: string){
    await Storage.set({
    key: 'adoptionId',
    value: JSON.stringify({
      userId: userId,
      dogId: dogID
      })
    });
  }

  

  gotoChat(){
    this.router.navigate(["/chatlist"]);
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

  back(){
    this.router.navigate(["/owneddogs"]);
  }

}

