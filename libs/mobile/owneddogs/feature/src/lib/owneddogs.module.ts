import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { owneddogsPageComponent } from './owneddogs.page';

import { owneddogsPageComponentRoutingModule } from './owneddogs-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromOwneddogs from './+state/owneddogs/owneddogs.reducer';
import { OwneddogsEffects } from './+state/owneddogs/owneddogs.effects';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    owneddogsPageComponentRoutingModule,
    StoreModule.forFeature(
      fromOwneddogs.OWNEDDOGS_FEATURE_KEY,
      fromOwneddogs.reducer
    ),
    EffectsModule.forFeature([OwneddogsEffects]),
  ],
  declarations: [owneddogsPageComponent],
})
export class owneddogsPageComponentModule {
  //public static GlobalVars = owneddogsPageComponent.GlobalVars;
}
