import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { LoginPageComponent } from './login.page';

import { LoginPageComponentRoutingModule } from './login-routing.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, LoginPageComponentRoutingModule],
  declarations: [LoginPageComponent],
})
export class LoginPageComponentModule {}
