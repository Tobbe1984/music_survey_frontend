/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { GenreVotingDto } from '../../models/genre-voting-dto';

export interface GetAllVotings$Params {
}

export function getAllVotings(http: HttpClient, rootUrl: string, params?: GetAllVotings$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<GenreVotingDto>>> {
  const rb = new RequestBuilder(rootUrl, getAllVotings.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<GenreVotingDto>>;
    })
  );
}

getAllVotings.PATH = '/api/v1/voting';
