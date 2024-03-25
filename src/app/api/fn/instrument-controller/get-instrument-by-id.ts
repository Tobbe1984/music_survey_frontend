/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { InstrumentDto } from '../../models/instrument-dto';

export interface GetInstrumentById$Params {
  id: number;
}

export function getInstrumentById(http: HttpClient, rootUrl: string, params: GetInstrumentById$Params, context?: HttpContext): Observable<StrictHttpResponse<InstrumentDto>> {
  const rb = new RequestBuilder(rootUrl, getInstrumentById.PATH, 'get');
  if (params) {
    rb.path('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<InstrumentDto>;
    })
  );
}

getInstrumentById.PATH = '/api/v1/instrument/{id}';
