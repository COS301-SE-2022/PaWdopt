import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {Apollo, gql } from 'apollo-angular';
import { Storage } from '@capacitor/storage'
@Component({
  selector: 'pawdopt-userinfo',
  templateUrl: 'userinfo.page.html',
  styleUrls: ['userinfo.page.scss', '../../../../../shared/styles/global.scss'],
  providers: [Apollo],
})
export class userinfoPageComponent {
  user:{
    name: string,
    email: string,
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
  
  t_ID!: string;

  constructor(private router: Router, private apollo: Apollo) {
    this.t_ID = "";
   
   this.getUserId();
   console.log(this.t_ID);
  }

  async getUserId() {
    this.t_ID = (await this.getObject()).uId;

    const userInfo =  gql`query{
      findAdopterById(_id: "${this.t_ID}"){
        name,
        email,
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
        findAdopterById: {
          name: string,
          email: string,
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
      this.user.name = data.findAdopterById.name;
      this.user.email = data.findAdopterById.email;
      this.user.pic = data.findAdopterById.pic;
      //this.user.location.lat = data.findAdopterById.location.lat;
      //this.user.location.lng = data.findAdopterById.location.lng;
      // console.log(this.user);

      if(data.findAdopterById.documents.length > 0){

      //Does not compare type and change path
        data.findAdopterById.documents.forEach(element => {
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
  }

  async getObject() {
    const ret = await Storage.get({ key: 'userId' });
    if(ret.value){
      return JSON.parse(ret.value);
    }
  }

  back(){
    //Takes you back to the previous page
    this.router.navigate(["/dashboard"]);
  }

  idclick(){
    this.router.navigate([this.ident.path]);
  }

}

