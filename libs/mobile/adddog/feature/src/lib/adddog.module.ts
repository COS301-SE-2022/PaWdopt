import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { AdddogPageComponent } from './adddog.page';

import { AdddogPageComponentRoutingModule } from './adddog-routing.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, AdddogPageComponentRoutingModule],
  declarations: [AdddogPageComponent],
})
export class AdddogPageComponentModule {}
