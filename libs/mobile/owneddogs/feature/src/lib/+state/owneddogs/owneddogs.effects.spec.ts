import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule } from '@nrwl/angular';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as OwneddogsActions from './owneddogs.actions';
import { OwneddogsEffects } from './owneddogs.effects';

describe('OwneddogsEffects', () => {
  let actions: Observable<Action>;
  let effects: OwneddogsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        OwneddogsEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(OwneddogsEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: OwneddogsActions.init() });

      const expected = hot('-a-|', {
        a: OwneddogsActions.loadOwneddogsSuccess({ owneddogs: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
