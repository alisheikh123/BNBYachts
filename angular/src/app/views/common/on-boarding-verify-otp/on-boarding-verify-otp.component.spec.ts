import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnBoardingVerifyOtpComponent } from './on-boarding-verify-otp.component';

describe('OnBoardingVerifyOtpComponent', () => {
  let component: OnBoardingVerifyOtpComponent;
  let fixture: ComponentFixture<OnBoardingVerifyOtpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnBoardingVerifyOtpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnBoardingVerifyOtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
