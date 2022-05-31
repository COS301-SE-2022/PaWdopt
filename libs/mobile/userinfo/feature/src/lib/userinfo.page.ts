import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'pawdopt-userinfo',
  templateUrl: 'userinfo.page.html',
  styleUrls: ['userinfo.page.scss', '../../../../../shared/styles/global.scss'],
})
export class userinfoPageComponent {
  
  constructor(private router: Router){}

  // login(){
  //   // TODO Complete login validation
  //   console.log("login validation");
    
  //   this.router.navigate(["/home"]);
  // }

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

