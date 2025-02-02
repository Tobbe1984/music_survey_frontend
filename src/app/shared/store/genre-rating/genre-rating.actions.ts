import { createAction, props } from '@ngrx/store';
import { GenreRating } from "./genre-rating.reducer";

export const setupGenreRatings = createAction('[GenreRating] Setup GenreRatings');
export const setupGenreRatingsSuccess = createAction(
  '[GenreRating] Load GenreRatings Success',
  props<{ genreRatings: GenreRating[] }>()
);

export const changeRating = createAction(
  '[GenreRating] Chnage rating',
  props<{ genreRating: GenreRating, rating: number }>()
);

export const saveGenreRatings = createAction('[GenreRating] Save GenreRatings');

export const saveGenreRatingsSuccess = createAction('[GenreRating] Save GenreRatings Success');

export const saveGenreRatingsFailure = createAction('[GenreRating] Save GenreRatings Failure');
