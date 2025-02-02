import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";

import {StoreModule} from "@ngrx/store";
import {instrumentReducer} from "./shared/store/instrument/instrument.reducer";
import {EffectsModule} from "@ngrx/effects";
import {InstrumentEffects} from "./shared/store/instrument/instrument.effects";
import {genreRatingReducer} from "./shared/store/genre-rating/genre-rating.reducer";
import {GenreRatingEffects} from "./shared/store/genre-rating/genre-rating.effects";

@NgModule({
  declarations: [
      AppComponent
  ],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({ instrument: instrumentReducer, genreRatings: genreRatingReducer }),
    EffectsModule.forRoot([InstrumentEffects, GenreRatingEffects])
  ],
  providers: [provideHttpClient(withInterceptorsFromDi())]
})
export class AppModule { }
