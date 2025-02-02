import { Injectable } from '@angular/core';
import { Router, Resolve } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import {selectSelectedInstruments} from "../store/instrument/instrument.selectors";
import {InstrumentDto} from "../../api/models/instrument-dto";

@Injectable({
  providedIn: 'root'
})
export class InstrumentSelectionResolver implements Resolve<boolean> {
  constructor(private store: Store, private router: Router) {}

  resolve(): Observable<boolean> {
    return this.store.select(selectSelectedInstruments).pipe(
      first(),
      map((instruments: InstrumentDto[]) => {
        if (!instruments || instruments.length === 0) {
          this.router.navigate(['/instrument']);
          return false;
        }
        return true;
      })
    );
  }
}
