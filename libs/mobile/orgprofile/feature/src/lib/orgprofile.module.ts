import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { orgprofilePageComponent } from './orgprofile.page';
import { orgprofilePageComponentRoutingModule } from './orgprofile-routing.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, orgprofilePageComponentRoutingModule],
  declarations: [orgprofilePageComponent],
})
export class orgprofilePageComponentModule {
  //public orgName = orgprofilePageComponent.orgName; //unsure if this is the correct way to do this
}
