import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoatBookingPaymentComponent } from './boat-booking-payment.component';

describe('BoatBookingPaymentComponent', () => {
  let component: BoatBookingPaymentComponent;
  let fixture: ComponentFixture<BoatBookingPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoatBookingPaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoatBookingPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
