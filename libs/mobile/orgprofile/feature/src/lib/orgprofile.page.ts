import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {Apollo, gql } from 'apollo-angular';
import { VarsFacade } from '@pawdopt/shared/data-store';
@Component({
  selector: 'pawdopt-orgprofile',
  templateUrl: 'orgprofile.page.html',
  styleUrls: ['orgprofile.page.scss', '../../../../../shared/styles/global.scss'],
  providers: [Apollo, VarsFacade]
})
export class orgprofilePageComponent {
  
  orgId!:string;

  org:{
    orgName: string,
    dateCreated: Date,
    location:{
      lat: number,
      lng: number,
    },
    totalDogs: number,
    totalAdoptions: number
  }={
    orgName: "",
    dateCreated: new Date(),
    location:{
      lat: 0,
      lng: 0,
    },
    totalDogs: 0,
    totalAdoptions: 0
  }

  constructor(private router: Router, private apollo: Apollo,private varsFacade: VarsFacade){
    this.varsFacade.orgId$.subscribe(orgId => {
      this.orgId = orgId;
    });
    this.getOrg();
  }

  getOrg(){
    const findOrgByIdQuery = gql`query {
      findOrgById(_id: "${this.orgId}") {
        orgName
        dateCreated
        location {
          lat
          lng
        }
        totalDogs
        totalAdoptions
    }`;
    this.apollo.watchQuery({
      query: findOrgByIdQuery,
      fetchPolicy: 'network-only'
    }).valueChanges.subscribe((result) => {
      console.log(result);
      const data = result.data as {
        findOrgById: {
          orgName: string,
          dateCreated: Date,
          location: {
            lat: number,
            lng: number,
          },
          totalDogs: number,
          totalAdoptions: number
        }
      };
    this.org = data.findOrgById; //if error then do each var indiv.
    });
  }


  signup(){
    // Done in signup
    this.router.navigate(["/signup"]);
  }
  
  addorg(){
    this.router.navigate(["/addorg"]);
  }

  home(){
    this.router.navigate(["/owneddogs"]);
  }

  likeddogs(){
    this.router.navigate(["/userlikes"]);
  }

  profile(){
    this.router.navigate(["/userprofile"]);
  }

  preferences(){
    //this.router.navigate(["/userinfo"]); Not implemented yet
  }

}

