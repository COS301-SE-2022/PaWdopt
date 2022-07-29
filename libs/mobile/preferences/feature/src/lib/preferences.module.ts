import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { PreferencesPageComponent } from './preferences.page';

import { PreferencesPageComponentRoutingModule } from './preferences-routing.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, PreferencesPageComponentRoutingModule],
  declarations: [PreferencesPageComponent],
})
export class PreferencesPageComponentModule {}
