import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InstrumentService} from "../Instrument/instrument.service";
import {Router} from "@angular/router";
import {GenreControllerService} from "../api/services/genre-controller.service";
import {GenreVotingControllerService} from "../api/services/genre-voting-controller.service";
import {AsyncPipe, CommonModule, JsonPipe, NgIf} from "@angular/common";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {GenreDto} from "../api/models/genre-dto";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {MatSliderModule} from "@angular/material/slider";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {GenreVotingDto} from "../api/models/genre-voting-dto";
import {InstrumentDto} from "../api/models/instrument-dto";

interface GenreVoting extends GenreDto {
  value: number;
}

@Component({
    selector: 'app-voting',
    templateUrl: './voting.component.html',
    styleUrls: ['./voting.component.scss'],
    imports: [FormsModule, CommonModule, ReactiveFormsModule, JsonPipe, NgIf, AsyncPipe, MatSliderModule, MatCardModule, MatFormFieldModule, MatInputModule]
})
export class VotingComponent implements OnInit {
  rockVote = 0;
  heavyMetalVote = 0;
  popVote = 0;
  classicVote = 0;

  onSubmit() {
    // Process votes here (e.g., send to server, display results)
    console.log('Vote submitted:', {
      rockVote: this.rockVote,
      heavyMetalVote: this.heavyMetalVote,
      popVote: this.popVote,
      classicVote: this.classicVote
    });
  }

  ngOnInit(): void {
  }
}
