/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { GenreDto } from '../../models/genre-dto';

export interface GetGenreById$Params {
  id: number;
}

export function getGenreById(http: HttpClient, rootUrl: string, params: GetGenreById$Params, context?: HttpContext): Observable<StrictHttpResponse<GenreDto>> {
  const rb = new RequestBuilder(rootUrl, getGenreById.PATH, 'get');
  if (params) {
    rb.path('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<GenreDto>;
    })
  );
}

getGenreById.PATH = '/api/v1/genre/{id}';
