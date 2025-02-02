import { createReducer, on } from '@ngrx/store';
import { InstrumentDto } from '../../../api/models/instrument-dto';
import * as InstrumentActions from './instrument.actions';

export interface InstrumentState {
  instruments: InstrumentDto[];
  selectedInstruments: InstrumentDto[];
}

export const initialState: InstrumentState = {
  instruments: [],
  selectedInstruments: []
};

export const instrumentReducer = createReducer(
  initialState,
  on(InstrumentActions.loadInstrumentsSuccess, (state, { instruments }) => ({
    ...state,
    instruments
  })),
  on(InstrumentActions.addInstrument, (state, { instrument }) => ({
    ...state,
    selectedInstruments: [...state.selectedInstruments, instrument]
  })),
  on(InstrumentActions.removeInstrument, (state, { instrument }) => ({
    ...state,
    selectedInstruments: state.selectedInstruments.filter(i => i.name !== instrument.name)
  }))
);
