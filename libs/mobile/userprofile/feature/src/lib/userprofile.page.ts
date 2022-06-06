import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'pawdopt-userprofile',
  templateUrl: 'userprofile.page.html',
  styleUrls: ['userprofile.page.scss', '../../../../../shared/styles/global.scss'],
})
export class userprofilePageComponent {
  
  constructor(private router: Router){}

  back(){
    // TODO Complete login validation
    console.log("login validation");
    
    this.router.navigate(["/home"]);
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

