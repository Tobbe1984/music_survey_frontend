/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { GenreVotingDto } from '../../models/genre-voting-dto';

export interface SaveGenre$Params {
      body: Array<GenreVotingDto>
}

export function saveGenre(http: HttpClient, rootUrl: string, params: SaveGenre$Params, context?: HttpContext): Observable<StrictHttpResponse<GenreVotingDto>> {
  const rb = new RequestBuilder(rootUrl, saveGenre.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<GenreVotingDto>;
    })
  );
}

saveGenre.PATH = '/api/v1/voting';
