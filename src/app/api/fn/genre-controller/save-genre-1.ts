/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { GenreDto } from '../../models/genre-dto';

export interface SaveGenre1$Params {
      body: GenreDto
}

export function saveGenre1(http: HttpClient, rootUrl: string, params: SaveGenre1$Params, context?: HttpContext): Observable<StrictHttpResponse<GenreDto>> {
  const rb = new RequestBuilder(rootUrl, saveGenre1.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
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

saveGenre1.PATH = '/api/v1/genre';
