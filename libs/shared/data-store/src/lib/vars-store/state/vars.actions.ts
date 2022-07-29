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

export const storeOrgId = createAction(
  '[Vars Page] Store OrgId',
  props<{ orgId: string }>()
);

export const getOrgId = createAction(
  '[Vars Page] Get OrgId'
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

export const storeGender = createAction(//used in home page and preferences
  '[Vars Page] Store Gender',
  props<{ gender: string }>()
);

export const getGender = createAction(//used in home page and preferences
  '[Vars Page] Get Gender',
);

export const storeLocationRange = createAction(//used in home page and preferences
  '[Vars Page] Store Location',
  props<{ locationrange: number }>()
);

export const getLocationRange = createAction(//used in home page and preferences
  '[Vars Page] Get Location',
);

export const storeBreed = createAction(//used in home page and preferences
  '[Vars Page] Store Breed',
  props<{ breed: string }>()
);

export const getBreed = createAction(//used in home page and preferences
  '[Vars Page] Get Breed',
);

export const storeminSize = createAction(//used in home page and preferences (of dog)
  '[Vars Page] Store min Size of dog',
  props<{ minSize: number }>()
);

export const getminSize = createAction(//used in home page and preferences (of dog)
  '[Vars Page] Get min Size of dog',
);

export const storemaxSize = createAction(//used in home page and preferences (of dog)
  '[Vars Page] Store max Size of dog',
  props<{ maxSize: number }>()
);

export const getmaxSize = createAction(//used in home page and preferences (of dog)
  '[Vars Page] Get max Size of dog',
);

export const storeminAge = createAction(//used in home page and preferences (this is the age range of a dog)
  '[Vars Page] Store min age range',
  props<{ minAge: number }>()
);

export const getminAge = createAction(//used in home page and preferences
  '[Vars Page] Get min age range',
);

export const storemaxAge = createAction(//used in home page and preferences (this is the age range of a dog)
  '[Vars Page] Store max age range',
  props<{ maxAge: number }>()
);

export const getmaxAge = createAction(//used in home page and preferences
  '[Vars Page] Get max age range',
);

