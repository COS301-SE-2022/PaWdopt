import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { uikitPageComponent } from './uikit.page';

import { uikitPageComponentRoutingModule } from './uikit-routing.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, uikitPageComponentRoutingModule],
  declarations: [uikitPageComponent],
})
export class uikitPageComponentModule {}
