import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GenreRatingState } from './genre-rating.reducer';

export const selectGenreRatingState = createFeatureSelector<GenreRatingState>('genreRatings');

export const selectAllGenres = createSelector(
  selectGenreRatingState,
  (state) => state.genreRatings
);
