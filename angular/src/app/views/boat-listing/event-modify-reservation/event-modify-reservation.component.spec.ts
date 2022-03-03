import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventModifyReservationComponent } from './event-modify-reservation.component';

describe('EventModifyReservationComponent', () => {
  let component: EventModifyReservationComponent;
  let fixture: ComponentFixture<EventModifyReservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventModifyReservationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventModifyReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
