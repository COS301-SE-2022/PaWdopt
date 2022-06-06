import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'pawdopt-owneddogs',
  templateUrl: 'owneddogs.page.html',
  styleUrls: ['owneddogs.page.scss', '../../../../../shared/styles/global.scss'],
})
export class owneddogsPageComponent {
  
  constructor(private router: Router){}

  dashboard(){
    // TODO Complete login validation
    console.log("login validation");
    
    this.router.navigate(["/dashboard"]);
  }

  update(){
    // TODO Complete login validation
    console.log("login validation");
    
    this.router.navigate(["/updateorremovedog"]);
  }
  // addorg(){
  //   // TODO Complete login validation
  //   console.log("login validation");
    
  //   this.router.navigate(["/addorg"]);
  // }

  home(){
    this.router.navigate(["/home"]);
  }

  likeddogs(){
    this.router.navigate(["/userlikes"]); //Will need to change so that likeddogs alternates between company and user
  }

  profile(){
    this.router.navigate(["/userprofile"]);
  }

  preferences(){
    //this.router.navigate(["/userinfo"]); Not implemented yet
  }


}

