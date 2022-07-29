import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { SignupPageComponent } from './signup.page';

import { SignupPageComponentRoutingModule } from './signup-routing.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, SignupPageComponentRoutingModule],
  declarations: [SignupPageComponent],
})
export class SignupPageComponentModule {}
