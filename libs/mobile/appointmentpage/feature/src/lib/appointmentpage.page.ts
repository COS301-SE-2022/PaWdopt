import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {Apollo, gql } from 'apollo-angular';
// import { Adopter, OrgMember } from 'libs/backend/shell/api/feature/src/lib/api.schema';
@Component({
  selector: 'pawdopt-appointmentpage',
  templateUrl: 'appointmentpage.page.html',
  styleUrls: ['appointmentpage.page.scss', '../../../../../shared/styles/global.scss'],
  providers: [Apollo]
})
export class appointmentpagePageComponent {

  // inputEmail!: string;
  // inputPassword!: string;
  // public static orgName:string;
  // public static adopterEmail:string;
  inputName!: string;
  inputEmail!: string;
  inputLocation!: string;
  inputDescription!: string;
  inputStartDate!: Date;
  inputEndDate!: Date;
  // startTime!: string;
  // endTime!: string;

  constructor(private router: Router, private apollo: Apollo){
    
  }

  makeAppointment(){
    return;
  }

  back(){
    this.router.navigate(['/chat']);
  }

  signup(){
    // Done in signup
    this.router.navigate(["/signup"]);
  }
  
  addorg(){
    this.router.navigate(["/addorg"]);
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
    //this.router.navigate(["/userinfo"]); Not implemented yet
  }

}

