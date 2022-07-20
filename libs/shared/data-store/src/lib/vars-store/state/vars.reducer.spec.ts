// import { Action } from '@ngrx/store';

// import * as VarsActions from './vars.actions';
// import { VarsEntity } from './vars.models';
// import { State, initialState, reducer } from './vars.reducer';

// describe('Vars Reducer', () => {
//   const createVarsEntity = (id: string, name = ''): VarsEntity => ({
//     id,
//     name: name || `name-${id}`,
//   });

//   describe('valid Vars actions', () => {
//     it('loadVarsSuccess should return the list of known Vars', () => {
//       const vars = [
//         createVarsEntity('PRODUCT-AAA'),
//         createVarsEntity('PRODUCT-zzz'),
//       ];
//       const action = VarsActions.loadVarsSuccess({ vars });

//       const result: State = reducer(initialState, action);

//       expect(result.loaded).toBe(true);
//       expect(result.ids.length).toBe(2);
//     });
//   });

//   describe('unknown action', () => {
//     it('should return the previous state', () => {
//       const action = {} as Action;

//       const result = reducer(initialState, action);

//       expect(result).toBe(initialState);
//     });
//   });
// });
