import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { AddorgPageComponent } from './addorg.page';

import { AddorgPageComponentRoutingModule } from './addorg-routing.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, AddorgPageComponentRoutingModule],
  declarations: [AddorgPageComponent],
})
export class AddorgPageComponentModule {}
