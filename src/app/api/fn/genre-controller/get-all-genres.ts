/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { GenreDto } from '../../models/genre-dto';

export interface GetAllGenres$Params {
}

export function getAllGenres(http: HttpClient, rootUrl: string, params?: GetAllGenres$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<GenreDto>>> {
  const rb = new RequestBuilder(rootUrl, getAllGenres.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<GenreDto>>;
    })
  );
}

getAllGenres.PATH = '/api/v1/genre';
