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
import {MatToolbar} from "@angular/material/toolbar";
import {MatIcon} from "@angular/material/icon";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from "@angular/material/sidenav";
import {MatListItem, MatNavList} from "@angular/material/list";
import {MatIconButton} from "@angular/material/button";

@NgModule({
  declarations: [
      AppComponent
  ],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({instrument: instrumentReducer, genreRatings: genreRatingReducer}),
    EffectsModule.forRoot([InstrumentEffects, GenreRatingEffects]),
    MatToolbar,
    MatIcon,
    MatMenu,
    MatMenuTrigger,
    MatSidenavContent,
    MatSidenavContainer,
    MatNavList,
    MatListItem,
    MatMenuItem,
    MatSidenav,
    MatIconButton
  ],
  providers: [provideHttpClient(withInterceptorsFromDi())]
})
export class AppModule { }
