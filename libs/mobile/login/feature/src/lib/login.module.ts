import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { LoginPageComponent } from './login.page';

import { LoginPageComponentRoutingModule } from './login-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromLogin from './+state/login/login.reducer';
import { LoginEffects } from './+state/login/login.effects';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageComponentRoutingModule,
    StoreModule.forFeature(fromLogin.LOGIN_FEATURE_KEY, fromLogin.reducer),
    EffectsModule.forFeature([LoginEffects]),
  ],
  declarations: [LoginPageComponent],
})
export class LoginPageComponentModule {
}
