import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'pawdopt-dashboard',
  templateUrl: 'dashboard.page.html',
  styleUrls: ['dashboard.page.scss', '../../../../../shared/styles/global.scss'],
})
export class dashboardPageComponent {
  
  constructor(private router: Router){}

  // dashboard(){
  //   // TODO Complete dashboard validation
  //   console.log("dashboard validation");
    
  //   this.router.navigate(["/home"]);
  // }

  // addDog(){
  //   this.router.navigate(["/adddog"]);
  // }

}

