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
  gender$ = this.store.pipe(select(VarsSelectors.getGender));
  locationrange$ = this.store.pipe(select(VarsSelectors.getLocationRange));
  breed$ = this.store.pipe(select(VarsSelectors.getBreed));
  minSize$ = this.store.pipe(select(VarsSelectors.getminSize));
  maxSize$ = this.store.pipe(select(VarsSelectors.getmaxSize));
  minAge$ = this.store.pipe(select(VarsSelectors.getminAge));
  maxAge$ = this.store.pipe(select(VarsSelectors.getmaxAge));

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

  setGender(gender: string) {
    this.store.dispatch(VarsActions.storeGender({ gender }));
  }

  setLocationRange(locationrange: number) {
    this.store.dispatch(VarsActions.storeLocationRange({ locationrange }));
  }

  setBreed(breed: string) {
    this.store.dispatch(VarsActions.storeBreed({ breed }));
  }

  setminSize(minSize: number) {
    this.store.dispatch(VarsActions.storeminSize({ minSize }));
  }

  setminAge(minAge: number) {
    this.store.dispatch(VarsActions.storeminAge({ minAge }));
  }

  setmaxSize(maxSize: number) {
    this.store.dispatch(VarsActions.storemaxSize({ maxSize }));
  }
  
  setmaxAge(maxAge: number) {
    this.store.dispatch(VarsActions.storemaxAge({ maxAge }));
  }

}
