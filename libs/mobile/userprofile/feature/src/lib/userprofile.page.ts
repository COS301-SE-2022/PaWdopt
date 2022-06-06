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

