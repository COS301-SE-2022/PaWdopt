import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as LoginActions from './login.actions';
import { LoginEntity } from './login.models';

export const LOGIN_FEATURE_KEY = 'login';

export interface State extends EntityState<LoginEntity> {
  selectedId?: string | number; // which Login record has been selected
  loaded: boolean; // has the Login list been loaded
  error?: string | null; // last known error (if any)
}

export interface LoginPartialState {
  readonly [LOGIN_FEATURE_KEY]: State;
}

export const loginAdapter: EntityAdapter<LoginEntity> =
  createEntityAdapter<LoginEntity>();

export const initialState: State = loginAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const loginReducer = createReducer(
  initialState,
  on(LoginActions.init, (state) => ({ ...state, loaded: false, error: null })),
  on(LoginActions.loadLoginSuccess, (state, { login }) =>
    loginAdapter.setAll(login, { ...state, loaded: true })
  ),
  on(LoginActions.loadLoginFailure, (state, { error }) => ({ ...state, error })),
  on(LoginActions.storeEmail, (state, { email }) => ({ ...state, email }))
);

export function reducer(state: State | undefined, action: Action) {
  return loginReducer(state, action);
}
