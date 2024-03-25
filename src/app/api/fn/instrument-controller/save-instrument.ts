/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { InstrumentDto } from '../../models/instrument-dto';

export interface SaveInstrument$Params {
      body: InstrumentDto
}

export function saveInstrument(http: HttpClient, rootUrl: string, params: SaveInstrument$Params, context?: HttpContext): Observable<StrictHttpResponse<InstrumentDto>> {
  const rb = new RequestBuilder(rootUrl, saveInstrument.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
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

saveInstrument.PATH = '/api/v1/instrument';
