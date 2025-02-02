import { createFeatureSelector, createSelector } from '@ngrx/store';
import { InstrumentState } from './instrument.reducer';

export const selectInstrumentState = createFeatureSelector<InstrumentState>('instrument');

export const selectAllInstruments = createSelector(
  selectInstrumentState,
  (state) => state.instruments
);

export const selectSelectedInstruments = createSelector(
  selectInstrumentState,
  (state) => state.selectedInstruments
);
