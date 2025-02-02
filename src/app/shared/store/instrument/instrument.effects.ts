import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { InstrumentControllerService } from '../../../api/services/instrument-controller.service';
import * as InstrumentActions from './instrument.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class InstrumentEffects {
  loadInstruments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InstrumentActions.loadInstruments),
      mergeMap(() =>
        this.instrumentService.getAllInstruments().pipe(
          map(instruments => InstrumentActions.loadInstrumentsSuccess({ instruments })),
          catchError(() => of({ type: '[Instrument] Load Instruments Failed' }))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private instrumentService: InstrumentControllerService
  ) {}
}
