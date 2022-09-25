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


  IDstring!: string;
  PORstring!: string;
  BSSstring!: string;
  MLstring!: string;

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

  ID:{
    path: string
  } = {
    path: ""
  };

  POR: {
    path: string
  } = {
    path: ""
  };

  BSS: {
    path: string
  } = {
    path: ""
  };

  ML: {
    path: string
  } = {
    path: ""
  };
  
  t_ID!: string;

  constructor(private router: Router, private apollo: Apollo) {
    this.t_ID = "";
   
   this.getUserId();
   console.log(this.t_ID);
  }
  
  showIDImage(){
    // TODO: unhide pic
    return this.IDstring;
  }

  showPORImage(){
    // TODO: unhide pic
    return this.PORstring;
  }

  showBSSImage(){
    // TODO: unhide pic
    return this.BSSstring;
  }

  showMLImage(){
    // TODO: unhide pic
    return this.MLstring;
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
      this.user.documents = data.findAdopterById.documents;
      //this.user.location.lat = data.findAdopterById.location.lat;
      //this.user.location.lng = data.findAdopterById.location.lng;
      // console.log(this.user);

      if(data.findAdopterById.documents.length > 0){

      //Does not compare type and change path
        data.findAdopterById.documents.forEach(element => {
          if(element.type === "ID"){
            this.ID.path = element.path;
            this.IDstring = element.path;
          }else if(element.type === "POR"){
            this.POR.path = element.path;
            this.PORstring = element.path;
          }else if(element.type === "BSS"){
            this.BSS.path = element.path;
            this.BSSstring = element.path;
          }else if(element.type === "ML"){
            this.ML.path = element.path;
            this.MLstring = element.path;
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

  // idclick(){
  //   this.router.navigate([this.ident.path]);
  // }

}

