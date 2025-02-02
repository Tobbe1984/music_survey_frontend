import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstrumentComponent } from "./Instrument/instrument.component";
import { RatingComponent } from "./rating/rating.component";
import {InstrumentSelectionResolver} from "./shared/resolver/instrument-selection.resolver";

const routes: Routes = [
  { path: 'instrument', component: InstrumentComponent },
  { path: 'voting', component: RatingComponent, resolve: { instrumentsSelected: InstrumentSelectionResolver }},
  { path: '',   redirectTo: '/instrument', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
