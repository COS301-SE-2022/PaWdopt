import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule } from '@nrwl/angular';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as VarsActions from './vars.actions';
import { VarsEffects } from './vars.effects';

describe('VarsEffects', () => {
  let actions: Observable<Action>;
  let effects: VarsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        VarsEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(VarsEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: VarsActions.init() });

      const expected = hot('-a-|', {
        a: VarsActions.loadVarsSuccess({ vars: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
