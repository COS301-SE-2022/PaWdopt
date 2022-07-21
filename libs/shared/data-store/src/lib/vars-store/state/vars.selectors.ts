import { createFeatureSelector, createSelector } from '@ngrx/store';
import { VARS_FEATURE_KEY, State, varsAdapter } from './vars.reducer';

// Lookup the 'Vars' feature state managed by NgRx
export const getVarsState = createFeatureSelector<State>(VARS_FEATURE_KEY);

const { selectAll, selectEntities } = varsAdapter.getSelectors();

export const getVarsLoaded = createSelector(
  getVarsState,
  (state: State) => state.loaded
);

export const getVarsError = createSelector(
  getVarsState,
  (state: State) => state.error
);

export const getAllVars = createSelector(getVarsState, (state: State) =>
  selectAll(state)
);

export const getVarsEntities = createSelector(getVarsState, (state: State) =>
  selectEntities(state)
);

export const getSelectedId = createSelector(
  getVarsState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getVarsEntities,
  getSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);

export const getEmail = createSelector(
  getVarsState,
  (state: State) => state.email
);

export const getOrgName = createSelector(
  getVarsState,
  (state: State) => state.orgName
);