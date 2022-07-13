import { createAction, props } from '@ngrx/store';
import { OwneddogsEntity } from './owneddogs.models';

export const init = createAction('[Owneddogs Page] Init');

export const loadOwneddogsSuccess = createAction(
  '[Owneddogs/API] Load Owneddogs Success',
  props<{ owneddogs: OwneddogsEntity[] }>()
);

export const loadOwneddogsFailure = createAction(
  '[Owneddogs/API] Load Owneddogs Failure',
  props<{ error: any }>()
);
