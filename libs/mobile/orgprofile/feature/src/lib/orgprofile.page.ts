import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {Apollo, gql } from 'apollo-angular';
// import { Adopter, OrgMember } from 'libs/backend/shell/api/feature/src/lib/api.schema';
@Component({
  selector: 'pawdopt-orgprofile',
  templateUrl: 'orgprofile.page.html',
  styleUrls: ['orgprofile.page.scss', '../../../../../shared/styles/global.scss'],
  providers: [Apollo]
})
export class orgprofilePageComponent {

  inputEmail!: string;
  inputPassword!: string;
  public static orgName:string;
  public static adopterEmail:string;

  constructor(private router: Router, private apollo: Apollo){
    
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

