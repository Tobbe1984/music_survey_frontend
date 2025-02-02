import { createReducer, on } from '@ngrx/store';
import { GenreDto } from '../../../api/models/genre-dto';
import * as GenreRatingActions from './genre-rating.actions';

export interface GenreRating extends GenreDto {
  rating: number;
}

export interface GenreRatingState {
  genreRatings: GenreRating[];
}

export const initialState: GenreRatingState = {
  genreRatings: []
};

export const genreRatingReducer = createReducer(
  initialState,
  on(GenreRatingActions.setupGenreRatingsSuccess, (state, { genreRatings }) => ({
    ...state,
    genreRatings
  })),
  on(GenreRatingActions.changeRating, (state, { genreRating, rating }) => ({
    ...state,
    genreRatings: state.genreRatings.map(genre => {
      return genre.id === genreRating.id ? { ...genre, rating } : genre;
    })
  }))
);
