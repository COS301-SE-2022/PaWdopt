// import { VarsEntity } from './vars.models';
// import { varsAdapter, VarsPartialState, initialState } from './vars.reducer';
// import * as VarsSelectors from './vars.selectors';

// describe('Vars Selectors', () => {
//   const ERROR_MSG = 'No Error Available';
//   const getVarsId = (it: VarsEntity) => it.id;
//   const createVarsEntity = (id: string, name = '') =>
//     ({
//       id,
//       name: name || `name-${id}`,
//     } as VarsEntity);

//   let state: VarsPartialState;

//   beforeEach(() => {
//     state = {
//       vars: varsAdapter.setAll(
//         [
//           createVarsEntity('PRODUCT-AAA'),
//           createVarsEntity('PRODUCT-BBB'),
//           createVarsEntity('PRODUCT-CCC'),
//         ],
//         {
//           ...initialState,
//           selectedId: 'PRODUCT-BBB',
//           error: ERROR_MSG,
//           loaded: true,
//         }
//       ),
//     };
//   });

//   describe('Vars Selectors', () => {
//     it('getAllVars() should return the list of Vars', () => {
//       const results = VarsSelectors.getAllVars(state);
//       const selId = getVarsId(results[1]);

//       expect(results.length).toBe(3);
//       expect(selId).toBe('PRODUCT-BBB');
//     });

//     it('getSelected() should return the selected Entity', () => {
//       const result = VarsSelectors.getSelected(state) as VarsEntity;
//       const selId = getVarsId(result);

//       expect(selId).toBe('PRODUCT-BBB');
//     });

//     it('getVarsLoaded() should return the current "loaded" status', () => {
//       const result = VarsSelectors.getVarsLoaded(state);

//       expect(result).toBe(true);
//     });

//     it('getVarsError() should return the current "error" state', () => {
//       const result = VarsSelectors.getVarsError(state);

//       expect(result).toBe(ERROR_MSG);
//     });
//   });
// });
