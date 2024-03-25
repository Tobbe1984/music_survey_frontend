import { Injectable } from '@angular/core';
import {InstrumentDto} from "../api/models/instrument-dto";

@Injectable({
  providedIn: 'root'
})
export class InstrumentService {

  instruments: InstrumentDto[] = [];

  constructor() { }
}
