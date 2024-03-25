import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {AsyncPipe, CommonModule, JsonPipe, NgIf} from "@angular/common";
import {Observable, tap} from "rxjs";
import {InstrumentControllerService} from "../api/services/instrument-controller.service";
import {InstrumentDto} from "../api/models/instrument-dto";
import {InstrumentService} from "./instrument.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-genre',
  templateUrl: './instrument.component.html',
  styleUrls: ['./instrument.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, MatCheckboxModule, JsonPipe, NgIf, AsyncPipe]
})
export class InstrumentComponent implements OnInit {
  form: FormGroup;
  $instruments: Observable<InstrumentDto[]> = new Observable<InstrumentDto[]>();

  get instrumentsFormArray() {
    return this.form.controls['instruments'] as FormArray;
  }

  constructor(private formBuilder: FormBuilder,
              private instrumentControllerService: InstrumentControllerService,
              private instrumentService: InstrumentService,
              private router: Router) {
    this.form = this.formBuilder.group({
      instruments: new FormArray([])
    });
  }

  submit(instruments: InstrumentDto[]) {
    this.instrumentService.instruments = this.form.value.instruments
      .map((checked: boolean, i: number) => checked ? instruments[i].id : null)
      .filter((v: null) => v !== null)
      .map((id: number) => instruments.find(instrument => instrument.id === id));
    this.router.navigate(['/voting']);
  }

  ngOnInit(): void {
    this.$instruments = this.instrumentControllerService.getAllInstruments().pipe(tap(instruments => {
      instruments.forEach(() => this.instrumentsFormArray.push(new FormControl(false)));
    }));
  }
}
