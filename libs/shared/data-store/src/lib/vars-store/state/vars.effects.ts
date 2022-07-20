import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as VarsActions from './vars.actions';
import * as VarsFeature from './vars.reducer';

@Injectable()
export class VarsEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VarsActions.init),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return VarsActions.loadVarsSuccess({ vars: [] });
        },
        onError: (action, error) => {
          console.error('Error', error);
          return VarsActions.loadVarsFailure({ error });
        },
      })
    )
  );

  constructor(private readonly actions$: Actions) {}
}
