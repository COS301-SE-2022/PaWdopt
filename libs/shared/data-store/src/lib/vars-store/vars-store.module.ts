import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromVars from './state/vars.reducer';
import { VarsEffects } from './state/vars.effects';
import { VarsFacade } from './state/vars.facade';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromVars.VARS_FEATURE_KEY, fromVars.reducer),
    EffectsModule.forFeature([VarsEffects]),
  ],
  providers: [VarsFacade],
})
export class VarsStoreModule {}
