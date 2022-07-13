import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule } from '@nrwl/angular';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as LoginActions from './login.actions';
import { LoginEffects } from './login.effects';

describe('LoginEffects', () => {
  let actions: Observable<Action>;
  let effects: LoginEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        LoginEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(LoginEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: LoginActions.init() });

      const expected = hot('-a-|', {
        a: LoginActions.loadLoginSuccess({ login: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
