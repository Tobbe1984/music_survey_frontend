import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InstrumentComponent } from './instrument.component';
import { InstrumentControllerService } from '../api/services/instrument-controller.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { InstrumentDto } from '../api/models/instrument-dto';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('InstrumentComponent', () => {
  let component: InstrumentComponent;
  let fixture: ComponentFixture<InstrumentComponent>;
  let mockInstrumentService: jasmine.SpyObj<InstrumentControllerService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockInstrumentService = jasmine.createSpyObj('InstrumentControllerService', ['getAllInstruments']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        InstrumentComponent,
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
        MatCheckboxModule,
        MatListModule,
        MatCardModule,
        MatFormFieldModule,
        MatChipsModule,
        MatIconModule,
        MatInputModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: InstrumentControllerService, useValue: mockInstrumentService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(InstrumentComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load instruments on init', () => {
    const instruments: InstrumentDto[] = [{ id: 1, name: 'Gitarre' }, { id: 2, name: 'Klavier' }];
    mockInstrumentService.getAllInstruments.and.returnValue(of(instruments));

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.$instruments).toBeDefined();
  });

  it('should add selected instruments', () => {
    const instrument: InstrumentDto = { id: 1, name: 'Gitarre' };
    component.toggleInstrument(instrument, true);

    expect(component.selectedInstruments).toContain(instrument);
  });

  it('should remove selected instruments', () => {
    const instrument: InstrumentDto = { id: 1, name: 'Gitarre' };
    component.selectedInstruments.push(instrument);
    component.removeInstrument(instrument);

    expect(component.selectedInstruments).not.toContain(instrument);
  });

  it('should add other instrument', () => {
    component.otherInstrument = 'Violine';
    component.addOtherInstrument();

    expect(component.selectedInstruments.some(instr => instr.name === 'Violine')).toBeTrue();
  });

  it('should navigate on submit', () => {
    component.submit();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/voting']);
  });
});
