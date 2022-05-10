import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'pawdopt-signup',
  templateUrl: 'signup.page.html',
  styleUrls: ['signup.page.scss', '../../../../../shared/styles/global.scss'],
})
export class SignupPageComponent {
  constructor(private router: Router) {}

  signUp(){
    // TODO Complete login validation
    console.log("signup validation");
    
    this.router.navigate(["/home"]);
  }
}
