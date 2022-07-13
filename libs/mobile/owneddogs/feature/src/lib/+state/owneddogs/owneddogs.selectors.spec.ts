import { OwneddogsEntity } from './owneddogs.models';
import {
  owneddogsAdapter,
  OwneddogsPartialState,
  initialState,
} from './owneddogs.reducer';
import * as OwneddogsSelectors from './owneddogs.selectors';

describe('Owneddogs Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getOwneddogsId = (it: OwneddogsEntity) => it.id;
  const createOwneddogsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as OwneddogsEntity);

  let state: OwneddogsPartialState;

  beforeEach(() => {
    state = {
      owneddogs: owneddogsAdapter.setAll(
        [
          createOwneddogsEntity('PRODUCT-AAA'),
          createOwneddogsEntity('PRODUCT-BBB'),
          createOwneddogsEntity('PRODUCT-CCC'),
        ],
        {
          ...initialState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Owneddogs Selectors', () => {
    it('getAllOwneddogs() should return the list of Owneddogs', () => {
      const results = OwneddogsSelectors.getAllOwneddogs(state);
      const selId = getOwneddogsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = OwneddogsSelectors.getSelected(state) as OwneddogsEntity;
      const selId = getOwneddogsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getOwneddogsLoaded() should return the current "loaded" status', () => {
      const result = OwneddogsSelectors.getOwneddogsLoaded(state);

      expect(result).toBe(true);
    });

    it('getOwneddogsError() should return the current "error" state', () => {
      const result = OwneddogsSelectors.getOwneddogsError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
