import { createAction, props } from '@ngrx/store';
import { InstrumentDto } from '../../../api/models/instrument-dto';

export const loadInstruments = createAction('[Instrument] Load Instruments');
export const loadInstrumentsSuccess = createAction(
  '[Instrument] Load Instruments Success',
  props<{ instruments: InstrumentDto[] }>()
);

export const addInstrument = createAction(
  '[Instrument] Add Instrument',
  props<{ instrument: InstrumentDto }>()
);

export const removeInstrument = createAction(
  '[Instrument] Remove Instrument',
  props<{ instrument: InstrumentDto }>()
);
