import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {Apollo, gql } from 'apollo-angular';
import { VarsFacade } from '@pawdopt/shared/data-store';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Storage } from '@capacitor/storage';


@Component({
  selector: 'pawdopt-owneddogs',
  templateUrl: 'owneddogs.page.html',
  styleUrls: ['owneddogs.page.scss', '../../../../../shared/styles/global.scss'],
  providers: [Apollo, VarsFacade, AngularFireAuth],

})
export class owneddogsPageComponent {

  
  inputSearch!: string;
  orgId!: string;
  orgName!: string;


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

  // userLikes:{
  //   name:string,
  //   pic:string,
  // }[]=[];

  constructor(private router: Router, private apollo: Apollo, private varsFacade: VarsFacade, private afAuth: AngularFireAuth) {
    this.getDog(false);
  }

  getDog(search: boolean){
    this.dog=[]
    this.afAuth.currentUser.then(user => {
      const uid = user?.uid;

      if(uid){

        const getOrgDetailsQuery = gql`query {
          findOrgMemberById(_id: "${uid}") {
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
            this.orgName = data.findDogsByOrgId[0].organisation.name;
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
            // console.log(this.dog);
            // this.dog.map((element) => {
            //   console.log("hello");
            //   console.log("1" + element.name.toLowerCase() + this.inputSearch.toLowerCase());
            //   if(!element.name.toLowerCase().includes(this.inputSearch.toLowerCase())){
            //     console.log(element.name.toLowerCase() + this.inputSearch.toLowerCase());
            //     this.dog.splice(this.dog.indexOf(element), 1);
            //   }
            // });
            // console.log(this.dog);
            // filter the dog array based on the search input

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
              }
            })  
          }
          else{
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
    this.varsFacade.setOrgId(id);
    this.router.navigate(["/dashboard"]);
  }

  update(id: string){
    // console.log(id);
    // this.varsFacade.setDogID(id);
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

  updateLikes(id: string){
    this.varsFacade.setDogID(id);
  }

  addDog(){
    this.router.navigate(["/adddog"]);
  }
  
  home(){
    this.router.navigate(["/home"]);
  }

  likeddogs(){
    this.router.navigate(["/userlikes"]); 
    //Will need to change so that likeddogs alternates between company and user
  }

  profile(){
    this.router.navigate(["/userprofile"]);
  }

  preferences(){
    //this.router.navigate(["/userinfo"]); Not implemented yet
  }

  
}

