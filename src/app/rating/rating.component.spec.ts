import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Router } from '@angular/router';
import { Actions } from '@ngrx/effects';
import { Subject } from 'rxjs';
import { RatingComponent } from './rating.component';
import { selectAllGenres } from '../shared/store/genre-rating/genre-rating.selectors';
import { selectSelectedInstruments } from '../shared/store/instrument/instrument.selectors';
import { saveGenreRatings, saveGenreRatingsSuccess } from '../shared/store/genre-rating/genre-rating.actions';

describe('RatingComponent', () => {
  let component: RatingComponent;
  let fixture: ComponentFixture<RatingComponent>;
  let store: MockStore;
  let actions$: Subject<any>;
  const mockRouter = { navigate: jasmine.createSpy('navigate') };

  beforeEach(async () => {
    actions$ = new Subject();
    await TestBed.configureTestingModule({
      imports: [RatingComponent],
      providers: [
        provideMockStore({
          initialState: {},
          selectors: [
            { selector: selectAllGenres, value: [] },
            { selector: selectSelectedInstruments, value: [] },
          ],
        }),
        { provide: Router, useValue: mockRouter },
        { provide: Actions, useValue: actions$ },
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(RatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch saveGenreRatings on submitVotes', () => {
    spyOn(store, 'dispatch');
    component.submitVotes();
    expect(store.dispatch).toHaveBeenCalledWith(saveGenreRatings());
  });

  it('should navigate to "/instrument" after saveGenreRatingsSuccess', () => {
    component.submitVotes();
    actions$.next(saveGenreRatingsSuccess());
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/instrument']);
  });
});
