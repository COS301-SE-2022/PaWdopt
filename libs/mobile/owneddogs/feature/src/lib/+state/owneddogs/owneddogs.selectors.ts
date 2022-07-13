import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  OWNEDDOGS_FEATURE_KEY,
  State,
  owneddogsAdapter,
} from './owneddogs.reducer';

// Lookup the 'Owneddogs' feature state managed by NgRx
export const getOwneddogsState = createFeatureSelector<State>(
  OWNEDDOGS_FEATURE_KEY
);

const { selectAll, selectEntities } = owneddogsAdapter.getSelectors();

export const getOwneddogsLoaded = createSelector(
  getOwneddogsState,
  (state: State) => state.loaded
);

export const getOwneddogsError = createSelector(
  getOwneddogsState,
  (state: State) => state.error
);

export const getAllOwneddogs = createSelector(
  getOwneddogsState,
  (state: State) => selectAll(state)
);

export const getOwneddogsEntities = createSelector(
  getOwneddogsState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getOwneddogsState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getOwneddogsEntities,
  getSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
