import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'pawdopt-dashboard',
  templateUrl: 'dashboard.page.html',
  styleUrls: ['dashboard.page.scss', '../../../../../shared/styles/global.scss'],
})
export class dashboardPageComponent {
  
  constructor(private router: Router){}

  userinfo(){
    // TODO Complete dashboard validation
    this.router.navigate(["/userinfo"]);
  }

  // addDog(){
  //   this.router.navigate(["/adddog"]);
  // }

}

