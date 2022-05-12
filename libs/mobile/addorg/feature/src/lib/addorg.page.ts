import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'pawdopt-addorg',
  templateUrl: 'addorg.page.html',
  styleUrls: ['addorg.page.scss', '../../../../../shared/styles/global.scss'],
})
export class AddorgPageComponent {
  constructor(private router: Router) {}

  addOrg(){
    // TODO Complete login validation
    console.log("organisation validation");
    
    this.router.navigate(["/dashboard"]);
  }
}
