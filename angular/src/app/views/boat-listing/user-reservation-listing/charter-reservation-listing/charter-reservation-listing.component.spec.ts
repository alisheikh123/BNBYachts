import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharterReservationListingComponent } from './charter-reservation-listing.component';

describe('CharterReservationListingComponent', () => {
  let component: CharterReservationListingComponent;
  let fixture: ComponentFixture<CharterReservationListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharterReservationListingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharterReservationListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
