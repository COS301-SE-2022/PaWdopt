import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as LoginActions from './login.actions';
import * as LoginFeature from './login.reducer';

@Injectable()
export class LoginEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoginActions.init),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return LoginActions.loadLoginSuccess({ login: [] });
        },
        onError: (action, error) => {
          console.error('Error', error);
          return LoginActions.loadLoginFailure({ error });
        },
      })
    )
  );

  constructor(private readonly actions$: Actions) {}
}
