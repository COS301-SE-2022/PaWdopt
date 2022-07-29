import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { updateorremovedogPageComponent } from './updateorremovedog.page';

import { updateorremovedogPageComponentRoutingModule } from './updateorremovedog-routing.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, updateorremovedogPageComponentRoutingModule],
  declarations: [updateorremovedogPageComponent],
})
export class updateorremovedogPageComponentModule {}
