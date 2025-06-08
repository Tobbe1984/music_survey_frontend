import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {catchError, map, mergeMap, withLatestFrom} from 'rxjs/operators';
import * as GenreRatingActions from './genre-rating.actions';
import {of} from "rxjs";
import {GenreControllerService} from "../../../api/services/genre-controller.service";
import {GenreDto} from "../../../api/models/genre-dto";
import {GenreVotingControllerService} from "../../../api/services/genre-voting-controller.service";
import {select, Store, Action} from "@ngrx/store";
import {GenreRatingState} from "./genre-rating.reducer";
import {InstrumentState} from "../instrument/instrument.reducer";
import {selectSelectedInstruments} from "../instrument/instrument.selectors";
import {GenreVotingDto} from "../../../api/models/genre-voting-dto";
import {InstrumentDto} from "../../../api/models/instrument-dto";
import {selectAllGenres} from "./genre-rating.selectors";

@Injectable()
export class GenreRatingEffects {
  loadGenres$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GenreRatingActions.setupGenreRatings),
      mergeMap(() =>
        this.genresService.getAllGenres().pipe(
          map((genres: GenreDto[]) => {
            return GenreRatingActions.setupGenreRatingsSuccess({
              genreRatings: genres.map(genre => ({ ...genre, rating: 0 }))
            });
          }),
          catchError(() => of({ type: '[Genre] Load Genres Failed' }))
        )
      )
    )
  );

  saveGenreRatings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GenreRatingActions.saveGenreRatings),
      withLatestFrom(
        this.store.pipe(select(selectAllGenres)),
        this.store.pipe(select(selectSelectedInstruments))
      ),
      mergeMap(([
        action,
        genreRatings,
        selectedInstruments
      ]: [Action, GenreRating[], InstrumentDto[]]) => {
        const genreVotingData: GenreVotingDto[] = [];

        selectedInstruments.forEach(instrument => {
          genreRatings.forEach(genre => {
            genreVotingData.push({
              genre: { id: genre.id, name: genre.name },
              instrument: { id: instrument.id, name: instrument.name },
              value: genre.rating
            });
          });
        });

        return this.genreVotingService.saveGenre({body: genreVotingData}).pipe(
          map(() => GenreRatingActions.saveGenreRatingsSuccess()),
          catchError(() => of(GenreRatingActions.saveGenreRatingsFailure()))
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private genresService: GenreControllerService,
    private genreVotingService: GenreVotingControllerService,
    private store: Store<{ genreRatings: GenreRatingState; instruments: InstrumentState }>
  ) {}
}
