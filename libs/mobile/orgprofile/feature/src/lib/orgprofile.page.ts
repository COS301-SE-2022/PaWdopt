import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {Apollo, gql } from 'apollo-angular';
import { VarsFacade } from '@pawdopt/shared/data-store';
import { Storage } from '@capacitor/storage';
@Component({
  selector: 'pawdopt-orgprofile',
  templateUrl: 'orgprofile.page.html',
  styleUrls: ['orgprofile.page.scss', '../../../../../shared/styles/global.scss'],
  providers: [Apollo, VarsFacade]
})
export class orgprofilePageComponent {
  
  orgId!:string;
  dateString!: string;

  org:{
    name: string,
    dateFounded: Date,
    location:{
      lat: number,
      lng: number,
    },
    totalDogs: number,
    totalAdoptions: number
  }={
    name: "",
    dateFounded: new Date(),
    location:{
      lat: 0,
      lng: 0,
    },
    totalDogs: 0,
    totalAdoptions: 0
  }

  constructor(private router: Router, private apollo: Apollo,private varsFacade: VarsFacade){
    this.getOrg();
  }

  async getObject() {
    const ret = await Storage.get({ key: 'dogID' });
    if(ret.value){
      return JSON.parse(ret.value);
    }
  }

  async getOrg(){
    
    this.orgId = (await this.getObject()).name;
    const findOrgByIdQuery = gql`query {
      findOrgById(_id: "${this.orgId}") {
        name
        dateFounded
        location {
          lat
          lng
        }
        totalDogs
        totalAdoptions
      }
    }`;
    this.apollo.watchQuery({
      query: findOrgByIdQuery,
      fetchPolicy: 'network-only'
    }).valueChanges.subscribe((result) => {
      console.log(result);
      const data = result.data as {
        findOrgById: {
          name: string,
          dateFounded: Date,
          location: {
            lat: number,
            lng: number,
          },
          totalDogs: number,
          totalAdoptions: number
        }
      };
    this.org = data.findOrgById; //if error then do each var indiv.
    const date = new Date(this.org.dateFounded);
    this.dateString = (date.getDay() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()).toString();
    });
  }

  back(){
    this.router.navigate(['/userlikes']);
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

  preferences(){
    this.router.navigate(["/preferences"]); 
  }

}

