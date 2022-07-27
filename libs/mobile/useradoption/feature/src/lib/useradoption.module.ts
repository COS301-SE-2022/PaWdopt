import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { useradoptionPageComponent } from './useradoption.page';
import { useradoptionPageComponentRoutingModule } from './useradoption-routing.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, useradoptionPageComponentRoutingModule],
  declarations: [useradoptionPageComponent],
})
export class useradoptionPageComponentModule {
  // public orgName = useradoptionPageComponent.orgName;
  // public static adopterEmail = useradoptionPageComponent.adopterEmail;
  //Unsure if this is the best way to do this
}
