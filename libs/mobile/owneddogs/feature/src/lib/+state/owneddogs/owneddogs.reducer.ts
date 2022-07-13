import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as OwneddogsActions from './owneddogs.actions';
import { OwneddogsEntity } from './owneddogs.models';

export const OWNEDDOGS_FEATURE_KEY = 'owneddogs';

export interface State extends EntityState<OwneddogsEntity> {
  selectedId?: string | number; // which Owneddogs record has been selected
  loaded: boolean; // has the Owneddogs list been loaded
  error?: string | null; // last known error (if any)
}

export interface OwneddogsPartialState {
  readonly [OWNEDDOGS_FEATURE_KEY]: State;
}

export const owneddogsAdapter: EntityAdapter<OwneddogsEntity> =
  createEntityAdapter<OwneddogsEntity>();

export const initialState: State = owneddogsAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const owneddogsReducer = createReducer(
  initialState,
  on(OwneddogsActions.init, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(OwneddogsActions.loadOwneddogsSuccess, (state, { owneddogs }) =>
    owneddogsAdapter.setAll(owneddogs, { ...state, loaded: true })
  ),
  on(OwneddogsActions.loadOwneddogsFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return owneddogsReducer(state, action);
}
