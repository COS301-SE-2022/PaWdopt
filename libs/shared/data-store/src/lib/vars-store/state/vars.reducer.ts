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
  orgId: string;
  orgMemberEmail: string;
  dogID: string;
  userID: string;
  gender: string;
  locationrange: number;
  breed: string;
  minSize: number;
  minAge: number;
  maxSize: number;
  maxAge: number;
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
  orgId: '',
  orgMemberEmail: '',
  dogID: '',
  userID: '',
  gender: '',
  locationrange: 0,
  breed: '',
  minSize: 0,
  minAge: 0,
  maxSize: 0,
  maxAge: 0
  // dogID: '',
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
  on(VarsActions.storeOrgId, (state, { orgId }) => ({ ...state, orgId })),
  on(VarsActions.getOrgId, (state) => state),
  on(VarsActions.storeOrgMemberEmail, (state, { orgMemberEmail }) => ({ ...state, orgMemberEmail })),
  on(VarsActions.getOrgMemberEmail, (state) => state),
  on(VarsActions.storeDogID, (state, { dogID }) => ({ ...state, dogID })),
  on(VarsActions.getDogID, (state) => state),
  on(VarsActions.storeUserID, (state, { userID }) => ({ ...state, userID })),
  on(VarsActions.getUserID, (state) => state),
  on(VarsActions.storeGender, (state, { gender }) => ({ ...state, gender })),
  on(VarsActions.getGender, (state) => state),
  on(VarsActions.storeLocationRange, (state, { locationrange }) => ({ ...state, locationrange })),
  on(VarsActions.getLocationRange, (state) => state),
  on(VarsActions.storeBreed, (state, { breed }) => ({ ...state, breed })),
  on(VarsActions.getBreed, (state) => state),
  on(VarsActions.storeminSize, (state, { minSize }) => ({ ...state, minSize })),
  on(VarsActions.getminSize, (state) => state),
  on(VarsActions.storeminAge, (state, { minAge }) => ({ ...state, minAge })),
  on(VarsActions.getminAge, (state) => state),
  on(VarsActions.storemaxSize, (state, { maxSize }) => ({ ...state, maxSize })),
  on(VarsActions.getmaxSize, (state) => state),
  on(VarsActions.storemaxAge, (state, { maxAge }) => ({ ...state, maxAge })),
  on(VarsActions.getmaxAge, (state) => state),
);

export function reducer(state: State | undefined, action: Action) {
  return varsReducer(state, action);
}
