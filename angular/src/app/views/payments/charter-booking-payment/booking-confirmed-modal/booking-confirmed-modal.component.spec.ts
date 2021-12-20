import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingConfirmedModalComponent } from './booking-confirmed-modal.component';

describe('BookingConfirmedModalComponent', () => {
  let component: BookingConfirmedModalComponent;
  let fixture: ComponentFixture<BookingConfirmedModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingConfirmedModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingConfirmedModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
