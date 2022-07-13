import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as OwneddogsActions from './owneddogs.actions';
import * as OwneddogsFeature from './owneddogs.reducer';

@Injectable()
export class OwneddogsEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OwneddogsActions.init),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return OwneddogsActions.loadOwneddogsSuccess({ owneddogs: [] });
        },
        onError: (action, error) => {
          console.error('Error', error);
          return OwneddogsActions.loadOwneddogsFailure({ error });
        },
      })
    )
  );

  constructor(private readonly actions$: Actions) {}
}
