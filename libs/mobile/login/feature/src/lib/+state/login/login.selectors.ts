import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LOGIN_FEATURE_KEY, State, loginAdapter } from './login.reducer';

// Lookup the 'Login' feature state managed by NgRx
export const getLoginState = createFeatureSelector<State>(LOGIN_FEATURE_KEY);

const { selectAll, selectEntities } = loginAdapter.getSelectors();

export const getLoginLoaded = createSelector(
  getLoginState,
  (state: State) => state.loaded
);

export const getLoginError = createSelector(
  getLoginState,
  (state: State) => state.error
);

export const getAllLogin = createSelector(getLoginState, (state: State) =>
  selectAll(state)
);

export const getLoginEntities = createSelector(getLoginState, (state: State) =>
  selectEntities(state)
);

export const getSelectedId = createSelector(
  getLoginState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getLoginEntities,
  getSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);