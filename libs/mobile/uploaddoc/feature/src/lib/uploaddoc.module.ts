import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { uploaddocPageComponent } from './uploaddoc.page';
import { uploaddocPageComponentRoutingModule } from './uploaddoc-routing.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, uploaddocPageComponentRoutingModule],
  declarations: [uploaddocPageComponent],
})
export class uploaddocPageComponentModule {
  public orgName = uploaddocPageComponent.orgName;
  public static adopterEmail = uploaddocPageComponent.adopterEmail;
}
