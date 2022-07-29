import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { userinfoPageComponent } from './userinfo.page';

import { userinfoPageComponentRoutingModule } from './userinfo-routing.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, userinfoPageComponentRoutingModule],
  declarations: [userinfoPageComponent],
})
export class userinfoPageComponentModule {}
