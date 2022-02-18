import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventReservationCancellationComponent } from './event-reservation-cancellation.component';

describe('EventReservationCancellationComponent', () => {
  let component: EventReservationCancellationComponent;
  let fixture: ComponentFixture<EventReservationCancellationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventReservationCancellationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventReservationCancellationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
