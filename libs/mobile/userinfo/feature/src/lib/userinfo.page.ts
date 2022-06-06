import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'pawdopt-userinfo',
  templateUrl: 'userinfo.page.html',
  styleUrls: ['userinfo.page.scss', '../../../../../shared/styles/global.scss'],
})
export class userinfoPageComponent {
  
  constructor(private router: Router){}

  back(){
    // TODO Complete login validation 
    this.router.navigate(["/dashboard"]);
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

  // signup(){
  //   // TODO Complete login validation
  //   console.log("login validation");
    
  //   this.router.navigate(["/signup"]);
  // }
  // addorg(){
  //   // TODO Complete login validation
  //   console.log("login validation");
    
  //   this.router.navigate(["/addorg"]);
  // }

}

