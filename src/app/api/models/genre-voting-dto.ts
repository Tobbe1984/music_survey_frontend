/* tslint:disable */
/* eslint-disable */
import { GenreDto } from '../models/genre-dto';
import { InstrumentDto } from '../models/instrument-dto';
export interface GenreVotingDto {
  genre: GenreDto;
  instrument: InstrumentDto;
  value: number;
}
