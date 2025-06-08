import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InstrumentComponent } from './instrument.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { InstrumentState } from '../shared/store/instrument/instrument.reducer';
import { selectAllInstruments, selectSelectedInstruments } from '../shared/store/instrument/instrument.selectors';
import { addInstrument, loadInstruments, removeInstrument } from '../shared/store/instrument/instrument.actions';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { InstrumentDto } from '../api/models/instrument-dto';

describe('InstrumentComponent', () => {
  let component: InstrumentComponent;
  let fixture: ComponentFixture<InstrumentComponent>;
  let store: MockStore<InstrumentState>;
  let mockRouter = { navigate: jasmine.createSpy('navigate') };

  const mockInstruments: InstrumentDto[] = [
    { id: 1, name: 'Gitarre' },
    { id: 2, name: 'Klavier' },
  ];

  const mockSelectedInstruments: InstrumentDto[] = [
    { id: 1, name: 'Gitarre' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InstrumentComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatCheckboxModule,
        MatListModule,
        MatCardModule,
        MatFormFieldModule,
        MatChipsModule,
        MatIconModule,
        MatInputModule,
        MatButtonModule,
      ],
      providers: [
        provideMockStore({
          initialState: {
            instruments: [],
            selectedInstruments: [],
          },
          selectors: [
            { selector: selectAllInstruments, value: mockInstruments },
            { selector: selectSelectedInstruments, value: mockSelectedInstruments },
          ],
        }),
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstrumentComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('sollte die Komponente erstellen', () => {
    expect(component).toBeTruthy();
  });

  it('sollte loadInstruments beim ngOnInit dispatchen', () => {
    spyOn(store, 'dispatch');
    component.ngOnInit();
    expect(store.dispatch).toHaveBeenCalledWith(loadInstruments());
  });

  it('sollte ein Instrument hinzufügen, wenn toggleInstrument aufgerufen wird', () => {
    spyOn(store, 'dispatch');
    const instrument: InstrumentDto = { id: 3, name: 'Violine' };
    component.toggleInstrument(instrument, true);
    expect(store.dispatch).toHaveBeenCalledWith(addInstrument({ instrument }));
  });

  it('sollte ein Instrument entfernen, wenn toggleInstrument mit false aufgerufen wird', () => {
    spyOn(store, 'dispatch');
    const instrument: InstrumentDto = { id: 1, name: 'Gitarre' };
    component.toggleInstrument(instrument, false);
    expect(store.dispatch).toHaveBeenCalledWith(removeInstrument({ instrument }));
  });

  it('sollte ein neues Instrument über addOtherInstrument hinzufügen', () => {
    spyOn(store, 'dispatch');
    component.otherInstrument = 'Trompete';
    component.addOtherInstrument();
    expect(store.dispatch).toHaveBeenCalledWith(addInstrument({ instrument: { id: 0, name: 'Trompete' } }));
    expect(component.otherInstrument).toBe('');
  });

  it('sollte ein Instrument über removeInstrument entfernen', () => {
    spyOn(store, 'dispatch');
    const instrument: InstrumentDto = { id: 1, name: 'Gitarre' };
    component.removeInstrument(instrument);
    expect(store.dispatch).toHaveBeenCalledWith(removeInstrument({ instrument }));
  });

  it('sollte bei submit zur "/voting" Seite navigieren', () => {
    component.submit();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/voting']);
  });
});
