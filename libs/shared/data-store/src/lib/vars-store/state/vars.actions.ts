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