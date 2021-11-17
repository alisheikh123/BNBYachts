import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoatelBookingsComponent } from './boatel-bookings.component';

describe('BoatelBookingsComponent', () => {
  let component: BoatelBookingsComponent;
  let fixture: ComponentFixture<BoatelBookingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoatelBookingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoatelBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
