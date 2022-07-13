import { createAction, props } from '@ngrx/store';
import { LoginEntity } from './login.models';

export const init = createAction('[Login Page] Init');

export const loadLoginSuccess = createAction(
  '[Login/API] Load Login Success',
  props<{ login: LoginEntity[] }>()
);

export const loadLoginFailure = createAction(
  '[Login/API] Load Login Failure',
  props<{ error: any }>()
);

export const storeEmail = createAction(
  '[Login Page] Store Email',
  props<{ email: string }>()
);