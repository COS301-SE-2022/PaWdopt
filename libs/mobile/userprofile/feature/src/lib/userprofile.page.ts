import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'pawdopt-userprofile',
  templateUrl: 'userprofile.page.html',
  styleUrls: ['userprofile.page.scss', '../../../../../shared/styles/global.scss'],
  providers: [Apollo]
})
export class userprofilePageComponent {
  
  user:{
    name: string,
    email: string,
    IDNum: string,
    pic: {
      path: string
    },
    location: {
      lat: number,
      lng: number,
    }
  } = {
    name: "",
    email: "",
    IDNum: "",
    pic: {
      path: ""
    },
    location: {
      lat: 0,
      lng: 0,
    }
  };

  //passedEmail = loginPageComponentModule.user.email;

  constructor(private router: Router, private apollo: Apollo){
    //have to pass in email from login page
    console.log("Path will error out because the user field for the image path does not exist!")
    const userInfo =  gql`query{
      findAdopterByEmail(email: "jason@gmail.com"){ 
        name,
        email,
        IDNum,
        pic{
          path
        },
        location{
          lat,
          lng,
        },
        documents{
          type,
          path
        }
      }
    }`;
    
    this.apollo.watchQuery({
      query: userInfo,
      fetchPolicy: 'no-cache'
    }).valueChanges.subscribe((result) => {
      console.log(result);
      const  data = result.data as {
        findAdopterByEmail: {
          name: string,
          email: string,
          IDNum: string,
          pic: {
            path: string
          },
          location: {
            lat: number,
            lng: number,
          }
        }
      };
      this.user.name = data.findAdopterByEmail.name;
      this.user.email = data.findAdopterByEmail.email;
      this.user.pic.path = data.findAdopterByEmail.pic.path;
      this.user.location.lat = data.findAdopterByEmail.location.lat;
      this.user.location.lng = data.findAdopterByEmail.location.lng;

    });
  }

  back(){
    // TODO Complete login validation
    console.log("login validation");
    
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

}

