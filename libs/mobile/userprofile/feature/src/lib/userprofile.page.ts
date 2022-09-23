import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {Apollo, gql } from 'apollo-angular';
import { AngularFireAuth } from "@angular/fire/compat/auth";

@Component({
  selector: 'pawdopt-userprofile',
  templateUrl: 'userprofile.page.html',
  styleUrls: ['userprofile.page.scss', '../../../../../shared/styles/global.scss'],
  providers: [Apollo, AngularFireAuth],
})
export class userprofilePageComponent {
  
  user:{
    name: string,
    email: string,
    IDNum: string,
    pic: string,
    location: {
      lat: number,
      lng: number,
    }
  } = {
    name: "",
    email: "",
    IDNum: "",
    pic: "",
    location: {
      lat: 0,
      lng: 0,
    }
  };
  t_id: string;


  constructor(private router: Router, private apollo: Apollo, private fireAuth: AngularFireAuth) {
    this.t_id = "";

    this.fireAuth.currentUser.then(user => {
      if(user?.uid){
        this.t_id = user.uid;

        const userProfile =  gql`query{
          findAdopterById(_id: "${this.t_id}"){ 
            name,
            email,
            pic
          }
        }`;
        
        this.apollo.watchQuery({
          query: userProfile,
          fetchPolicy: 'no-cache'
        }).valueChanges.subscribe((result) => {
          const  data = result.data as {
            findAdopterById: {
              name: string,
              email: string,
              pic: string,
            }
          };
          this.user.name = data.findAdopterById.name;
          this.user.email = data.findAdopterById.email;
          this.user.pic = data.findAdopterById.pic;
          // this.user.location.lat = data.findAdopterByEmail.location.lat;
          // this.user.location.lng = data.findAdopterByEmail.location.lng;
        });
      }
    }).catch(() => {
      this.router.navigate(["/login"]);
    });
  }


  chat(){
    this.router.navigate(["/chatlist"]);
  }
  
  back(){
    this.router.navigate(["/home"]);
  }
  home(){
    this.router.navigate(["/home"]);
  }

  likeddogs(){
    this.router.navigate(["/userlikes"]);
  }

  profile(){
    this.router.navigate(["/userprofile"]);
  }

  signout(){
    this.router.navigate(["/login"]);
  }

  preferences(){
    //this.router.navigate(["/userinfo"]); Not implemented yet
  }
  // Usee uploaddoc page
  uploadDocs(){
    this.router.navigate(["/uploaddoc"]);
  }

}

