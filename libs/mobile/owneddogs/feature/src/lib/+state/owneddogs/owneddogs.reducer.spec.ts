import { Action } from '@ngrx/store';

import * as OwneddogsActions from './owneddogs.actions';
import { OwneddogsEntity } from './owneddogs.models';
import { State, initialState, reducer } from './owneddogs.reducer';

describe('Owneddogs Reducer', () => {
  const createOwneddogsEntity = (id: string, name = ''): OwneddogsEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Owneddogs actions', () => {
    it('loadOwneddogsSuccess should return the list of known Owneddogs', () => {
      const owneddogs = [
        createOwneddogsEntity('PRODUCT-AAA'),
        createOwneddogsEntity('PRODUCT-zzz'),
      ];
      const action = OwneddogsActions.loadOwneddogsSuccess({ owneddogs });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
