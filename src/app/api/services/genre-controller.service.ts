/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { deleteGenreById } from '../fn/genre-controller/delete-genre-by-id';
import { DeleteGenreById$Params } from '../fn/genre-controller/delete-genre-by-id';
import { GenreDto } from '../models/genre-dto';
import { getAllGenres } from '../fn/genre-controller/get-all-genres';
import { GetAllGenres$Params } from '../fn/genre-controller/get-all-genres';
import { getGenreById } from '../fn/genre-controller/get-genre-by-id';
import { GetGenreById$Params } from '../fn/genre-controller/get-genre-by-id';
import { saveGenre1 } from '../fn/genre-controller/save-genre-1';
import { SaveGenre1$Params } from '../fn/genre-controller/save-genre-1';

@Injectable({ providedIn: 'root' })
export class GenreControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getAllGenres()` */
  static readonly GetAllGenresPath = '/api/v1/genre';

  /**
   * Get all Genres.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllGenres()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllGenres$Response(params?: GetAllGenres$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<GenreDto>>> {
    return getAllGenres(this.http, this.rootUrl, params, context);
  }

  /**
   * Get all Genres.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllGenres$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllGenres(params?: GetAllGenres$Params, context?: HttpContext): Observable<Array<GenreDto>> {
    return this.getAllGenres$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<GenreDto>>): Array<GenreDto> => r.body)
    );
  }

  /** Path part for operation `saveGenre1()` */
  static readonly SaveGenre1Path = '/api/v1/genre';

  /**
   * Save a Genre.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `saveGenre1()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveGenre1$Response(params: SaveGenre1$Params, context?: HttpContext): Observable<StrictHttpResponse<GenreDto>> {
    return saveGenre1(this.http, this.rootUrl, params, context);
  }

  /**
   * Save a Genre.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `saveGenre1$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveGenre1(params: SaveGenre1$Params, context?: HttpContext): Observable<GenreDto> {
    return this.saveGenre1$Response(params, context).pipe(
      map((r: StrictHttpResponse<GenreDto>): GenreDto => r.body)
    );
  }

  /** Path part for operation `getGenreById()` */
  static readonly GetGenreByIdPath = '/api/v1/genre/{id}';

  /**
   * Get a Genre by its id.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getGenreById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getGenreById$Response(params: GetGenreById$Params, context?: HttpContext): Observable<StrictHttpResponse<GenreDto>> {
    return getGenreById(this.http, this.rootUrl, params, context);
  }

  /**
   * Get a Genre by its id.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getGenreById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getGenreById(params: GetGenreById$Params, context?: HttpContext): Observable<GenreDto> {
    return this.getGenreById$Response(params, context).pipe(
      map((r: StrictHttpResponse<GenreDto>): GenreDto => r.body)
    );
  }

  /** Path part for operation `deleteGenreById()` */
  static readonly DeleteGenreByIdPath = '/api/v1/genre/{id}';

  /**
   * Delete a Genre by its id.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteGenreById()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteGenreById$Response(params: DeleteGenreById$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return deleteGenreById(this.http, this.rootUrl, params, context);
  }

  /**
   * Delete a Genre by its id.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteGenreById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteGenreById(params: DeleteGenreById$Params, context?: HttpContext): Observable<void> {
    return this.deleteGenreById$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
