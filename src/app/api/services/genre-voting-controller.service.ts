/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { GenreVotingDto } from '../models/genre-voting-dto';
import { getAllVotings } from '../fn/genre-voting-controller/get-all-votings';
import { GetAllVotings$Params } from '../fn/genre-voting-controller/get-all-votings';
import { saveGenre } from '../fn/genre-voting-controller/save-genre';
import { SaveGenre$Params } from '../fn/genre-voting-controller/save-genre';

@Injectable({ providedIn: 'root' })
export class GenreVotingControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getAllVotings()` */
  static readonly GetAllVotingsPath = '/api/v1/voting';

  /**
   * Get all Votings.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllVotings()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllVotings$Response(params?: GetAllVotings$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<GenreVotingDto>>> {
    return getAllVotings(this.http, this.rootUrl, params, context);
  }

  /**
   * Get all Votings.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllVotings$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllVotings(params?: GetAllVotings$Params, context?: HttpContext): Observable<Array<GenreVotingDto>> {
    return this.getAllVotings$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<GenreVotingDto>>): Array<GenreVotingDto> => r.body)
    );
  }

  /** Path part for operation `saveGenre()` */
  static readonly SaveGenrePath = '/api/v1/voting';

  /**
   * Save a Voting.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `saveGenre()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveGenre$Response(params: SaveGenre$Params, context?: HttpContext): Observable<StrictHttpResponse<GenreVotingDto>> {
    return saveGenre(this.http, this.rootUrl, params, context);
  }

  /**
   * Save a Voting.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `saveGenre$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveGenre(params: SaveGenre$Params, context?: HttpContext): Observable<GenreVotingDto> {
    return this.saveGenre$Response(params, context).pipe(
      map((r: StrictHttpResponse<GenreVotingDto>): GenreVotingDto => r.body)
    );
  }

}
