/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { deleteInstrumentById } from '../fn/instrument-controller/delete-instrument-by-id';
import { DeleteInstrumentById$Params } from '../fn/instrument-controller/delete-instrument-by-id';
import { getAllInstruments } from '../fn/instrument-controller/get-all-instruments';
import { GetAllInstruments$Params } from '../fn/instrument-controller/get-all-instruments';
import { getInstrumentById } from '../fn/instrument-controller/get-instrument-by-id';
import { GetInstrumentById$Params } from '../fn/instrument-controller/get-instrument-by-id';
import { InstrumentDto } from '../models/instrument-dto';
import { saveInstrument } from '../fn/instrument-controller/save-instrument';
import { SaveInstrument$Params } from '../fn/instrument-controller/save-instrument';

@Injectable({ providedIn: 'root' })
export class InstrumentControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getAllInstruments()` */
  static readonly GetAllInstrumentsPath = '/api/v1/instrument';

  /**
   * Get all Instruments.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllInstruments()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllInstruments$Response(params?: GetAllInstruments$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<InstrumentDto>>> {
    return getAllInstruments(this.http, this.rootUrl, params, context);
  }

  /**
   * Get all Instruments.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllInstruments$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllInstruments(params?: GetAllInstruments$Params, context?: HttpContext): Observable<Array<InstrumentDto>> {
    return this.getAllInstruments$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<InstrumentDto>>): Array<InstrumentDto> => r.body)
    );
  }

  /** Path part for operation `saveInstrument()` */
  static readonly SaveInstrumentPath = '/api/v1/instrument';

  /**
   * Save an Instrument.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `saveInstrument()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveInstrument$Response(params: SaveInstrument$Params, context?: HttpContext): Observable<StrictHttpResponse<InstrumentDto>> {
    return saveInstrument(this.http, this.rootUrl, params, context);
  }

  /**
   * Save an Instrument.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `saveInstrument$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveInstrument(params: SaveInstrument$Params, context?: HttpContext): Observable<InstrumentDto> {
    return this.saveInstrument$Response(params, context).pipe(
      map((r: StrictHttpResponse<InstrumentDto>): InstrumentDto => r.body)
    );
  }

  /** Path part for operation `getInstrumentById()` */
  static readonly GetInstrumentByIdPath = '/api/v1/instrument/{id}';

  /**
   * Get an Instrument by its id.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getInstrumentById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getInstrumentById$Response(params: GetInstrumentById$Params, context?: HttpContext): Observable<StrictHttpResponse<InstrumentDto>> {
    return getInstrumentById(this.http, this.rootUrl, params, context);
  }

  /**
   * Get an Instrument by its id.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getInstrumentById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getInstrumentById(params: GetInstrumentById$Params, context?: HttpContext): Observable<InstrumentDto> {
    return this.getInstrumentById$Response(params, context).pipe(
      map((r: StrictHttpResponse<InstrumentDto>): InstrumentDto => r.body)
    );
  }

  /** Path part for operation `deleteInstrumentById()` */
  static readonly DeleteInstrumentByIdPath = '/api/v1/instrument/{id}';

  /**
   * Delete an Instrument by its id.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteInstrumentById()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteInstrumentById$Response(params: DeleteInstrumentById$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return deleteInstrumentById(this.http, this.rootUrl, params, context);
  }

  /**
   * Delete an Instrument by its id.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteInstrumentById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteInstrumentById(params: DeleteInstrumentById$Params, context?: HttpContext): Observable<void> {
    return this.deleteInstrumentById$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
