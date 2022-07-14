import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {Apollo, gql } from 'apollo-angular';
import { dashboardPageComponentModule } from '@pawdopt/mobile/dashboard/feature'
@Component({
  selector: 'pawdopt-userinfo',
  templateUrl: 'userinfo.page.html',
  styleUrls: ['userinfo.page.scss', '../../../../../shared/styles/global.scss'],
  providers: [Apollo]
})
export class userinfoPageComponent {
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
    },
    documents: {
      path: string
    }[]
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
    },
    documents: []
  };

  ident:{
    path: string
  } = {
    path: "../../assets/local-file-not-found.png"
  };

  poR: {
    path: string
  } = {
    path: "../../assets/local-file-not-found.png"
  };

  bankState: {
    path: string
  } = {
    path: "../../assets/local-file-not-found.png"
  };

  motivateLet: {
    path: string
  } = {
    path: "../../assets/local-file-not-found.png"
  };

  // passedEmail = dashboardPageComponentModule.user.email;
  
  constructor(private router: Router, private apollo: Apollo){
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
          },
          documents: {
            type: string,
            path: string
          }[]
        }
      };
      this.user.name = data.findAdopterByEmail.name;
      this.user.email = data.findAdopterByEmail.email;
      this.user.IDNum = data.findAdopterByEmail.IDNum;
      this.user.pic.path = data.findAdopterByEmail.pic.path;
      this.user.location.lat = data.findAdopterByEmail.location.lat;
      this.user.location.lng = data.findAdopterByEmail.location.lng;

      //Does not compare type and change path
      data.findAdopterByEmail.documents.forEach(element => {
        if(element.type === "identification"){
          this.ident.path = element.path;
        }else if(element.type === "poR"){
          this.poR.path = element.path;
        }else if(element.type === "bankState"){
          this.bankState.path = element.path;
        }else if(element.type === "motivateLet"){
          this.motivateLet.path = element.path;
        }else {
          this.ident.path = "../../assets/local-file-not-found.png";
        }
      })
    });
  }

  back(){
    //Takes you back to the previous page
    this.router.navigate(["/dashboard"]);
  }
}

