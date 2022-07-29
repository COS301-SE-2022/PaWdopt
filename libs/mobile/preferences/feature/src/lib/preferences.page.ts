import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { Storage } from '@capacitor/storage';

@Component({
  selector: 'pawdopt-preferences',
  templateUrl: 'preferences.page.html',
  styleUrls: ['preferences.page.scss', '../../../../../shared/styles/global.scss'],
  providers: [],
})
export class PreferencesPageComponent {
  gender!: string;
  breed!: string;
  size!: {
    lower: number;
    upper: number;
  };
  size2!: {
    lower: number;
    upper: number;
  };
  size3!: {
    lower: number;
    upper: number;
  };
  sizeAny!: boolean;

  constructor(private router: Router, public actionSheetController: ActionSheetController) {
    this.gender = "any";
    this.breed = "any";
    this.size = {
      lower: 0,
      upper: 100
    };
    this.size2 = {
      lower: 0,
      upper: 100
    };
    this.size3 = {
      lower: 0,
      upper: 100
    };
    this.sizeAny = true;
  }

  async setObject() {
    await Storage.set({
    key: 'preferences',
    value: JSON.stringify({
      gender: this.gender,
      // breed: this.breed,
      size: this.size,
      age: this.size2,
      location: this.size3
      })
    });
  }

  Back(){
    this.router.navigate(["/home"]);
  }

  home(){
    this.router.navigate(["/owneddogs"]);
  }

  likeddogs(){
    this.router.navigate(["/adoptionprocess"]);
  }

  profile(){
    this.router.navigate(["/orgprofile"]);
  }

  preferences(){
    //this.router.navigate(["/orgsettings"]); Not implemented yet
  }

  async saveChanges(){
    await this.setObject();
    this.router.navigate(["/home"]);
  }
}
