import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'pawdopt-uikit',
  templateUrl: 'uikit.page.html',
  styleUrls: ['uikit.page.scss', '../../../../../shared/styles/global.scss'],
})
export class uikitPageComponent {
  
  constructor(private router: Router){}

  uikit(){
    // TODO Complete uikit validation
    console.log("uikit validation");
    
    this.router.navigate(["/home"]);
  }

}

