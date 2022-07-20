import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as VarsActions from './vars.actions';
import { VarsEntity } from './vars.models';

export const VARS_FEATURE_KEY = 'vars';

export interface State extends EntityState<VarsEntity> {
  selectedId?: string | number; // which Vars record has been selected
  loaded: boolean; // has the Vars list been loaded
  error?: string | null; // last known error (if any)
  email: string; // from dashboard to userprofile
  orgName: string;
  // dogID: string; //from owned dogs to updateorremove a dog and from owneddogs to dashboard
}

export interface VarsPartialState {
  readonly [VARS_FEATURE_KEY]: State;
}

export const varsAdapter: EntityAdapter<VarsEntity> =
  createEntityAdapter<VarsEntity>();

export const initialState: State = varsAdapter.getInitialState({
  // set initial required properties
  loaded: false,
  email: '',
  orgName: '',
  dogID: ''
});

const varsReducer = createReducer(
  initialState,
  on(VarsActions.init, (state) => ({ ...state, loaded: false, error: null })),
  on(VarsActions.loadVarsSuccess, (state, { vars }) =>
    varsAdapter.setAll(vars, { ...state, loaded: true })
  ),
  on(VarsActions.loadVarsFailure, (state, { error }) => ({ ...state, error })),
  on(VarsActions.storeEmail, (state, { email }) => ({ ...state, email })),
  on(VarsActions.getEmail, (state) => state),
  on(VarsActions.storeOrgName, (state, { orgName }) => ({ ...state, orgName })),
  on(VarsActions.getOrgName, (state) => state)
);

export function reducer(state: State | undefined, action: Action) {
  return varsReducer(state, action);
}
