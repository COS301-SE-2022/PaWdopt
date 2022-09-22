import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {Apollo} from 'apollo-angular';
// import { Adopter, OrgMember } from 'libs/backend/shell/api/feature/src/lib/api.schema';
@Component({
  selector: 'pawdopt-uploaddoc',
  templateUrl: 'uploaddoc.page.html',
  styleUrls: ['uploaddoc.page.scss', '../../../../../shared/styles/global.scss'],
  providers: [Apollo]
})
export class uploaddocPageComponent {

  userID!: string;
  inputEmail!: string;
  inputPassword!: string;
  public static orgName:string;
  public static adopterEmail:string;

  constructor(private router: Router, private apollo: Apollo){
    //UserID from User Profile page
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

  back(){
    this.router.navigate(["/userprofile"]);

  }

}

