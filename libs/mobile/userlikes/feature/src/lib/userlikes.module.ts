import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { userlikesPageComponent } from './userlikes.page';

import { userlikesPageComponentRoutingModule } from './userlikes-routing.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, userlikesPageComponentRoutingModule],
  declarations: [userlikesPageComponent],
})
export class userlikesPageComponentModule {}
