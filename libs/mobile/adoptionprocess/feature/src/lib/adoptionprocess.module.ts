import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { adoptionprocessPageComponent } from './adoptionprocess.page';
import { adoptionprocessPageComponentRoutingModule } from './adoptionprocess-routing.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, adoptionprocessPageComponentRoutingModule],
  declarations: [adoptionprocessPageComponent],
})
export class adoptionprocessPageComponentModule {
  // public orgName = adoptionprocessPageComponent.orgName;
  // public static adopterEmail = adoptionprocessPageComponent.adopterEmail;
  //Unsure if this is the best way to do this
}
