import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventReservationListingComponent } from './event-reservation-listing.component';

describe('EventReservationListingComponent', () => {
  let component: EventReservationListingComponent;
  let fixture: ComponentFixture<EventReservationListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventReservationListingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventReservationListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
