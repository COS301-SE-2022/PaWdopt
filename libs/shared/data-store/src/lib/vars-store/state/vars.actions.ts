import { createAction, props } from '@ngrx/store';
import { VarsEntity } from './vars.models';

export const init = createAction('[Vars Page] Init');

export const loadVarsSuccess = createAction(
  '[Vars/API] Load Vars Success',
  props<{ vars: VarsEntity[] }>()
);

export const loadVarsFailure = createAction(
  '[Vars/API] Load Vars Failure',
  props<{ error: any }>()
);

export const storeEmail = createAction(
  '[Vars Page] Store Email',
  props<{ email: string }>()
);

export const getEmail = createAction(
  '[Vars Page] Get Email'
);

export const storeOrgName = createAction(
  '[Vars Page] Store OrgName',
  props<{ orgName: string }>()
);

export const getOrgName = createAction(
  '[Vars Page] Get OrgName'
);

export const storeOrgMemberEmail = createAction(//used in adddog and login page
  '[Vars Page] Store OrgMemberEmail',
  props<{ orgMemberEmail: string }>()
);

export const getOrgMemberEmail = createAction(//used in adddog and login page
  '[Vars Page] Get OrgMemberEmail',
);

export const storeDogID = createAction(//used in dashboard and owned dogs page
  '[Vars Page] Store DogID',
  props<{ dogID: string }>()
);

export const getDogID = createAction(//used in dashboard and owned dogs page
  '[Vars Page] Get DogID',
);

export const storeUserID = createAction(//used in dashboard and owned dogs page
  '[Vars Page] Store UserID',
  props<{ userID: string }>()
);

export const getUserID = createAction(//used in dashboard and owned dogs page
  '[Vars Page] Get UserID',
);