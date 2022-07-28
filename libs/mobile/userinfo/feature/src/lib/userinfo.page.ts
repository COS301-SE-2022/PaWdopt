import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {Apollo, gql } from 'apollo-angular';
import { VarsFacade } from '@pawdopt/shared/data-store';
@Component({
  selector: 'pawdopt-userinfo',
  templateUrl: 'userinfo.page.html',
  styleUrls: ['userinfo.page.scss', '../../../../../shared/styles/global.scss'],
  providers: [Apollo, VarsFacade],
})
export class userinfoPageComponent {
  user:{
    name: string,
    email: string,
    IDNum: string,
    pic: string,
    location: {
      lat: number,
      lng: number,
    },
    documents: {
      type: string,
      path: string
    }[]
  } = {
    name: "",
    email: "",
    IDNum: "",
    pic: "",
    location: {
      lat: 0,
      lng: 0,
    },
    documents: [{
      type: "",
      path: ""
    }]
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
  t_ID: string;

  constructor(private router: Router, private apollo: Apollo, private varsFacade: VarsFacade) {
    this.t_ID = "";
    this.varsFacade.userID$.subscribe(userID => {
        this.t_ID = userID;
    });

    const userInfo =  gql`query{
      findAdopterBy_Id(_id: "${this.t_ID}"){
        name,
        email,
        IDNum,
        pic,
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
      // console.log(result);
      const  data = result.data as {
        findAdopterBy_Id: {
          name: string,
          email: string,
          IDNum: string,
          pic: string,
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
      this.user.name = data.findAdopterBy_Id.name;
      this.user.email = data.findAdopterBy_Id.email;
      this.user.IDNum = data.findAdopterBy_Id.IDNum;
      this.user.pic = data.findAdopterBy_Id.pic;
      //this.user.location.lat = data.findAdopterBy_Id.location.lat;
      //this.user.location.lng = data.findAdopterBy_Id.location.lng;
      // console.log(this.user);

      if(data.findAdopterBy_Id.documents.length > 0){

      //Does not compare type and change path
        data.findAdopterBy_Id.documents.forEach(element => {
          if(element.type === "ID"){
            this.ident.path = element.path;
          }else if(element.type === "poR"){
            this.poR.path = element.path;
          }else if(element.type === "bank"){
            this.bankState.path = element.path;
          }else if(element.type === "motiv"){
            this.motivateLet.path = element.path;
          }
        })
      }
    });
  }//modal dialog

  back(){
    //Takes you back to the previous page
    this.router.navigate(["/dashboard"]);
  }

  idclick(){
    this.router.navigate([this.ident.path]);
  }

}

