import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {Apollo, gql } from 'apollo-angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Storage } from '@capacitor/storage';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'pawdopt-owneddogs',
  templateUrl: 'owneddogs.page.html',
  styleUrls: ['owneddogs.page.scss', '../../../../../shared/styles/global.scss'],
  providers: [Apollo, AngularFireAuth],

})
export class owneddogsPageComponent {

  
  inputSearch!: string;
  orgId!: string;
  orgName!: string;
  uid?: string;

  //get org name for login
  dog:{
    _id: string,
    name:string,
    age: number,
    likes: number,
    pic:string,
    breed:string
    orgId: string
  }[]=[]

  constructor(private router: Router, private apollo: Apollo, private afAuth: AngularFireAuth, private loadingCtrl: LoadingController) {
    this.showLoading();
    this.getDog(false);
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Waiting for dogs, if no dogs appear you will need to add them...',
      duration: 10000,
    });

    loading.present();
  }

  getDog(search: boolean){
    this.showLoading();
    this.dog=[]
    this.afAuth.currentUser.then(user => {
      this.uid = user?.uid;

      if(this.uid){

        const getOrgDetailsQuery = gql`query {
          findOrgMemberById(_id: "${this.uid}") {
            organisation
          } 
        }`;
        this.apollo.watchQuery({
          query: getOrgDetailsQuery,
          fetchPolicy: 'no-cache'
        }).valueChanges.subscribe((result) => {
          const data = result.data as {
            findOrgMemberById: {
              organisation: string
            }
          }
          this.orgId = data.findOrgMemberById.organisation;
          const getDogQuery = gql`query {
            findDogsByOrgId(_id: "${this.orgId}") {
              _id
              name
              dob
              pics
              breed
              usersLiked{
                name
              }
              organisation{
                name
              }
            }
          }`;
    
          this.apollo.watchQuery({
            query: getDogQuery,
            fetchPolicy: 'no-cache'
          }).valueChanges.subscribe((result) => {
            console.log(result);
            const data = result.data as {
              findDogsByOrgId: {
                _id: string,
                name: string,
                dob: Date,
                pics: string[],
                breed: string,
                usersLiked: {
                  name: string
                }[]
                organisation: {
                  _id: string,
                  name: string
                }
              }[]
            };
            if (data.findDogsByOrgId[0]) {
              this.orgName = data.findDogsByOrgId[0].organisation.name;
            }
            // this.dog.name = data.findDog.name;
            // this.dog.pic = data.findDog.pics[0].path;
            // this.dog.breed = data.findDog.breed;
            // this.dog.age = 0;
            // this.dog.likes = data.findDog.usersLiked.length;
            // console.log(data);
            // console.log(data.findDogByOrgName);
            //get the years between a Date and now
            // const now = new Date();
            // const birthDate = new Date(data.findDog.dob);
            // const age = now.getFullYear() - birthDate.getFullYear();
            const now = new Date();
            
          if(search){
            // filter the dog array based on the search input
            this.dog=[]
            data.findDogsByOrgId.forEach(element => {
              const birthDate = new Date(element.dob);
              if(element.name.toLowerCase().includes(this.inputSearch.toLowerCase())){
                this.dog.push(
                  {
                    _id: element._id,
                    name: element.name,
                    pic: element.pics[0],
                    age: now.getFullYear() - birthDate.getFullYear(),
                    likes: element.usersLiked.length,
                    breed: element.breed,
                    orgId: element.organisation._id
                  }
                );
              }else if(element.breed.toLowerCase().includes(this.inputSearch.toLowerCase())){
                this.dog.push(
                  {
                    _id: element._id,
                    name: element.name,
                    pic: element.pics[0],
                    age: now.getFullYear() - birthDate.getFullYear(),
                    likes: element.usersLiked.length,
                    breed: element.breed,
                    orgId: element.organisation._id
                  }
                );
              }
            })
          }
          else{
            this.dog=[];
            data.findDogsByOrgId.forEach(element => {
              const birthDate = new Date(element.dob);
              this.dog.push(
                {
                  _id: element._id,
                  name: element.name,
                  pic: element.pics[0],
                  age: now.getFullYear() - birthDate.getFullYear(),
                  likes: element.usersLiked.length,
                  breed: element.breed,
                  orgId: element.organisation._id
                }
              );
            })
          }
        });
      });
      }else{
        console.log("No user logged in");
      }
    });    
  }

  dashboard(id: string){
    this.setObject(id);
    console.log(id);
    this.router.navigate(["/dashboard"]);
  }

  update(id: string){
    this.setObject(id);
    this.router.navigate(["/updateorremovedog"]);
  }

    // JSON "set" example
  async setObject(id: string) {
    await Storage.set({
    key: 'dogID',
    value: JSON.stringify({
      id: 1,
      name: id
      })
    });
  }

  // updateLikes(id: string){
  //   return
  // }

  addDog(){
    this.router.navigate(["/adddog"]);
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
    //this.router.navigate(["/userinfo"]); Not implemented yet
  }

  chats(){
    this.router.navigate(["/chatlist"]);
  }
  
}

