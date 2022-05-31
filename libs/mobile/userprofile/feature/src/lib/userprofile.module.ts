import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { userprofilePageComponent } from './userprofile.page';

import { userprofilePageComponentRoutingModule } from './userprofile-routing.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, userprofilePageComponentRoutingModule],
  declarations: [userprofilePageComponent],
})
export class userprofilePageComponentModule {}
