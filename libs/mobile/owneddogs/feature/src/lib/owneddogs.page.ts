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

}

