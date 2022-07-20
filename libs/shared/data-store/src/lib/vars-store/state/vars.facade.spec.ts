import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { NxModule } from '@nrwl/angular';
import { readFirst } from '@nrwl/angular/testing';

import * as VarsActions from './vars.actions';
import { VarsEffects } from './vars.effects';
import { VarsFacade } from './vars.facade';
import { VarsEntity } from './vars.models';
import { VARS_FEATURE_KEY, State, initialState, reducer } from './vars.reducer';
import * as VarsSelectors from './vars.selectors';

interface TestSchema {
  vars: State;
}

describe('VarsFacade', () => {
  let facade: VarsFacade;
  let store: Store<TestSchema>;
  const createVarsEntity = (id: string, name = ''): VarsEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(VARS_FEATURE_KEY, reducer),
          EffectsModule.forFeature([VarsEffects]),
        ],
        providers: [VarsFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(VarsFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.allVars$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.init();

      list = await readFirst(facade.allVars$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadVarsSuccess` to manually update list
     */
    it('allVars$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.allVars$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        VarsActions.loadVarsSuccess({
          vars: [createVarsEntity('AAA'), createVarsEntity('BBB')],
        })
      );

      list = await readFirst(facade.allVars$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});
