import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { owneddogsPageComponent } from './owneddogs.page';

import { owneddogsPageComponentRoutingModule } from './owneddogs-routing.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, owneddogsPageComponentRoutingModule],
  declarations: [owneddogsPageComponent],
})
export class owneddogsPageComponentModule {}
