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
  $instruments: Observable<InstrumentDto[]> = new Observable<InstrumentDto[]>();

  selectedInstruments: InstrumentDto[] = [];
  otherInstrument: string = '';


  constructor(private instrumentControllerService: InstrumentControllerService,
              private router: Router) {
  }

  submit(instruments: InstrumentDto[]) {
    this.router.navigate(['/voting']);
  }

  ngOnInit(): void {
    this.$instruments = this.instrumentControllerService.getAllInstruments();
  }

  toggleInstrument(instrument: InstrumentDto, event: any) {
    if (event) {
      this.selectedInstruments.push(instrument);
    } else {
      this.removeInstrument(instrument);
    }
  }

  addOtherInstrument() {
    if (this.otherInstrument.trim() && !this.selectedInstruments.
    some(instr => instr.name.toLowerCase() === this.otherInstrument.trim().toLowerCase())) {
      this.selectedInstruments.push({id: 0, name: this.otherInstrument.trim()});
      this.otherInstrument = ''; // Eingabefeld leeren
    }
  }

  removeInstrument(instrument: InstrumentDto) {
    this.selectedInstruments = this.selectedInstruments.filter(item => item !== instrument);
  }

  instrumentSeleted(instrument: InstrumentDto) {
    return this.selectedInstruments.some(instr => instr.name.toLowerCase() === instrument.name.trim().toLowerCase());
  }
}
