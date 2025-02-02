import { Component, OnInit } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {AsyncPipe, CommonModule} from "@angular/common";
import {Observable} from "rxjs";
import {InstrumentControllerService} from "../api/services/instrument-controller.service";
import {InstrumentDto} from "../api/models/instrument-dto";
import {Router} from "@angular/router";
import {MatListModule} from "@angular/material/list";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatChip, MatChipListbox, MatChipsModule} from "@angular/material/chips";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {Store} from "@ngrx/store";
import {InstrumentState} from "../shared/store/instrument/instrument.reducer";
import {selectAllInstruments, selectSelectedInstruments} from "../shared/store/instrument/instrument.selectors";
import {addInstrument, loadInstruments, removeInstrument} from "../shared/store/instrument/instrument.actions";
import {map} from "rxjs/operators";

@Component({
    selector: 'app-instrument',
    templateUrl: './instrument.component.html',
    styleUrls: ['./instrument.component.scss'],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    AsyncPipe,
    MatListModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatChip,
    MatChipListbox,
    MatButton
  ]
})
export class InstrumentComponent implements OnInit {
  instruments$: Observable<InstrumentDto[]>;
  selectedInstruments$: Observable<InstrumentDto[]>;
  otherInstrument: string = '';


  constructor(private store: Store<InstrumentState>,
              private router: Router) {
    this.instruments$ = this.store.select(selectAllInstruments);
    this.selectedInstruments$ = this.store.select(selectSelectedInstruments);
  }

  submit() {
    this.router.navigate(['/voting']);
  }

  ngOnInit(): void {
    this.store.dispatch(loadInstruments());
  }

  toggleInstrument(instrument: InstrumentDto, event: any) {
    if (event) {
      this.store.dispatch(addInstrument({ instrument }));
    } else {
      this.store.dispatch(removeInstrument({ instrument }));
    }
  }

  addOtherInstrument() {
    if (this.otherInstrument.trim()) {
      const newInstrument: InstrumentDto = { id: 0, name: this.otherInstrument.trim() };
      this.store.dispatch(addInstrument({ instrument: newInstrument }));
      this.otherInstrument = '';
    }
  }

  removeInstrument(instrument: InstrumentDto) {
    this.store.dispatch(removeInstrument({ instrument }));
  }

  instrumentSelected(instrument: InstrumentDto): Observable<boolean> {
    return this.selectedInstruments$.pipe(
      map(selectedInstruments =>
        selectedInstruments.some(instr => instr.name.toLowerCase() === instrument.name.trim().toLowerCase())
      )
    );
  }
}
