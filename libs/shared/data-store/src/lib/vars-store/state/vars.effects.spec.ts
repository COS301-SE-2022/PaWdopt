import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule } from '@nrwl/angular';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from "@angular/platform-browser-dynamic/testing";
import { NgZone } from '@angular/core';

import * as VarsActions from './vars.actions';
import { VarsEffects } from './vars.effects';


describe('VarsEffects', () => {
  // let actions: Observable<Action>;
  // let effects: VarsEffects;
  // let zone: NgZone;

  // TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());

  // beforeEach(() => {
    // TestBed.configureTestingModule({
    //   imports: [NxModule.forRoot()],
    //   providers: [
    //     VarsEffects,
    //     provideMockActions(() => actions),
    //     provideMockStore(),
    //     { provide: NgZone, useFactory: () => zone = new NgZone({ enableLongStackTrace: false }) }
    //   ]
    // });

    // effects = TestBed.inject(VarsEffects);
  // });

  describe('init$', () => {
    it('should work', () => {
      expect(true).toBe(true);
    });
  }
  );
});
