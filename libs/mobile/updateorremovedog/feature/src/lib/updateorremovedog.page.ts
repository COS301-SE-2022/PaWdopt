import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'pawdopt-updateorremovedog',
  templateUrl: 'updateorremovedog.page.html',
  styleUrls: ['updateorremovedog.page.scss', '../../../../../shared/styles/global.scss'],
})
export class updateorremovedogPageComponent {
  
  constructor(private router: Router, ){}

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

  // async uploadPic(){
  //   const actionSheet = await this.actionSheetController.create({
  //     header: 'Upload picture',
  //     buttons: [{
  //       text: 'Take picture using your camera',
  //       icon: 'camera-outline',
  //       handler: () => {
  //         console.log('Take picture clicked');
  //       }
  //     }, {
  //       text: 'Choose a picture from your gallery',
  //       icon: 'image-outline',
  //       handler: () => {
  //         console.log('Choose a picture clicked');
  //       }
  //     }, {
  //       text: 'Cancel',
  //       icon: 'close',
  //       role: 'cancel',
  //       handler: () => {
  //         console.log('Cancel clicked');
  //       }
  //     }]
  //   });
  //   await actionSheet.present();

  //   const { role, data } = await actionSheet.onDidDismiss();
  //   console.log('onDidDismiss resolved with role and data', role, data);
  // }

}
