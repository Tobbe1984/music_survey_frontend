import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstrumentComponent } from "./Instrument/instrument.component";
import { VotingComponent } from "./voting/voting.component";

const routes: Routes = [
  { path: 'instrument', component: InstrumentComponent },
  { path: 'voting', component: VotingComponent },
  { path: '',   redirectTo: '/instrument', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
