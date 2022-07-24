import { Injectable } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';

import * as VarsActions from './vars.actions';
import * as VarsFeature from './vars.reducer';
import * as VarsSelectors from './vars.selectors';

@Injectable()
export class VarsFacade {
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(VarsSelectors.getVarsLoaded));
  allVars$ = this.store.pipe(select(VarsSelectors.getAllVars));
  selectedVars$ = this.store.pipe(select(VarsSelectors.getSelected));

  email$ = this.store.pipe(select(VarsSelectors.getEmail));
  orgName$ = this.store.pipe(select(VarsSelectors.getOrgName));
  orgMemberEmail$ = this.store.pipe(select(VarsSelectors.getOrgMemberEmail));
  dogID$ = this.store.pipe(select(VarsSelectors.getDogID));
  userID$ = this.store.pipe(select(VarsSelectors.getUserID));

  constructor(private readonly store: Store) {}

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(VarsActions.init());
  }

  setEmail(email: string) {
    this.store.dispatch(VarsActions.storeEmail({ email }));
  }
  
  setOrgName(orgName: string) {
    this.store.dispatch(VarsActions.storeOrgName({ orgName }));
  }

  setOrgMemberEmail(orgMemberEmail: string) {
    this.store.dispatch(VarsActions.storeOrgMemberEmail({ orgMemberEmail }));
  }

  setDogID(dogID: string) {
    this.store.dispatch(VarsActions.storeDogID({ dogID }));
  }

  setUserID(userID: string) {
    this.store.dispatch(VarsActions.storeUserID({ userID }));
  }
}
