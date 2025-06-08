import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Observable} from "rxjs";
import {take} from "rxjs/operators";
import {Store} from "@ngrx/store";
import {Actions, ofType} from "@ngrx/effects";
import {Router} from "@angular/router";
import {InstrumentState} from "../shared/store/instrument/instrument.reducer";
import {CommonModule} from "@angular/common";
import {MatCardModule} from "@angular/material/card";
import {MatSliderModule} from "@angular/material/slider";
import {MatButtonModule} from "@angular/material/button";
import {Component, OnInit} from "@angular/core";
import {InstrumentDto} from "../api/models/instrument-dto";
import {selectSelectedInstruments} from "../shared/store/instrument/instrument.selectors";
import {GenreRating} from "../shared/store/genre-rating/genre-rating.reducer";
import {selectAllGenres} from "../shared/store/genre-rating/genre-rating.selectors";
import {
  changeRating,
  saveGenreRatings,
  saveGenreRatingsSuccess,
  setupGenreRatings
} from "../shared/store/genre-rating/genre-rating.actions";

@Component({
  selector: 'app-rating',
  templateUrl: 'rating.component.html',
  styleUrls: ['rating.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatSliderModule, MatButtonModule, ReactiveFormsModule]
})
export class RatingComponent implements OnInit {
  genreRatings$: Observable<GenreRating[]>;
  selectedInstruments$: Observable<InstrumentDto[]>;

  constructor(
    private store: Store<InstrumentState>,
    private router: Router,
    private actions$: Actions
  ) {
    this.genreRatings$ = this.store.select(selectAllGenres);
    this.selectedInstruments$ = this.store.select(selectSelectedInstruments);
  }

  ngOnInit(): void {
    this.store.dispatch(setupGenreRatings());
  }

  submitVotes() {
    this.store.dispatch(saveGenreRatings());
    this.actions$.pipe(
      ofType(saveGenreRatingsSuccess),
      take(1)
    ).subscribe(() => this.router.navigate(['/instrument']));
  }

  onRatingChange($event: number, genreRating: GenreRating) {
    this.store.dispatch(changeRating({genreRating, rating: $event}))
  }
}
