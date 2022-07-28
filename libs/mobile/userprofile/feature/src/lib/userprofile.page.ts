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
  t_email: string;


  constructor(private router: Router, private apollo: Apollo, private fireAuth: AngularFireAuth) {
    this.t_email = "";

    this.fireAuth.currentUser.then(user => {
      // console.log(user?.email);
      if(user?.email){
        this.t_email = user.email;
        // console.log(this.t_email);

        const userProfile =  gql`query{
          findAdopterByEmail(email: "${this.t_email}"){ 
            name,
            email,
            IDNum,
            pic,
            location{
              lat,
              lng,
            },
          }
        }`;
        
        this.apollo.watchQuery({
          query: userProfile,
          fetchPolicy: 'no-cache'
        }).valueChanges.subscribe((result) => {
          const  data = result.data as {
            findAdopterByEmail: {
              name: string,
              email: string,
              IDNum: string,
              pic: string,
              location: {
                lat: number,
                lng: number,
              }
            }
          };
          this.user.name = data.findAdopterByEmail.name;
          this.user.email = data.findAdopterByEmail.email;
          this.user.pic = data.findAdopterByEmail.pic;
          // this.user.location.lat = data.findAdopterByEmail.location.lat;
          // this.user.location.lng = data.findAdopterByEmail.location.lng;
        });
      }
    }).catch(() => {
      this.router.navigate(["/login"]);
    });
  }

  back(){
    // TODO Complete login validation
    // console.log("login validation");
    
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

