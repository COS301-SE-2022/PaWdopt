import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as VarsActions from './vars.actions';
import * as VarsFeature from './vars.reducer';

@Injectable()
export class VarsEffects {
  constructor(private readonly actions$: Actions) {}
}
