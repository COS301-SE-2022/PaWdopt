import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { OrgSettingsPageComponent } from './orgsettings.page';

import { OrgSettingsPageComponentRoutingModule } from './orgsettings-routing.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, OrgSettingsPageComponentRoutingModule],
  declarations: [OrgSettingsPageComponent],
})
export class OrgSettingsPageComponentModule {}
