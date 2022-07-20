import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { appointmentpagePageComponent } from './appointmentpage.page';
import { appointmentpagePageComponentRoutingModule } from './appointmentpage-routing.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, appointmentpagePageComponentRoutingModule],
  declarations: [appointmentpagePageComponent],
})
export class appointmentpagePageComponentModule {
  public orgName = appointmentpagePageComponent.orgName;
  public static adopterEmail = appointmentpagePageComponent.adopterEmail;
}
