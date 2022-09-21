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
  size!: {
    lower: number;
    upper: number;
  };
  size2!: {
    lower: number;
    upper: number;
  };
  size3!: number;

  constructor(private router: Router, public actionSheetController: ActionSheetController) {
    this.returnToDefault();
    const filters = this.getObject();
      filters.then((value) => {
        if(value){
          if(this.gender != '')
            this.gender = value.gender;
          else this.gender = "any";
          this.size = value.age;
          this.size2 = value.size;
          this.size3 = value.location;
        }
        else {
          this.returnToDefault();
        }
      });
  }

  

  async getObject() {
    const ret = await Storage.get({ key: 'preferences' });
    if(ret.value){
      return JSON.parse(ret.value);
    } else return null;
  }
  async setObject() {
    await Storage.set({
    key: 'preferences',
    value: JSON.stringify({
      gender: this.gender,
      size: this.size,
      age: this.size2,
      location: this.size3
      })
    });
  }

  returnToDefault(){
    this.gender = "any";
    this.size = {
      lower: 0,
      upper: 100
    };
    this.size2 = {
      lower: 0,
      upper: 100
    };
    this.size3 = 100;
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
