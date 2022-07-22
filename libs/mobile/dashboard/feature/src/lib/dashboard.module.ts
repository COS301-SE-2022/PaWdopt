import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { dashboardPageComponent } from './dashboard.page';

import { dashboardPageComponentRoutingModule } from './dashboard-routing.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, dashboardPageComponentRoutingModule],
  declarations: [dashboardPageComponent],
})
export class dashboardPageComponentModule {
}
