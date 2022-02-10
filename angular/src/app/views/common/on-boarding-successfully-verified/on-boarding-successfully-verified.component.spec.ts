import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnBoardingSuccessfullyVerifiedComponent } from './on-boarding-successfully-verified.component';

describe('OnBoardingSuccessfullyVerifiedComponent', () => {
  let component: OnBoardingSuccessfullyVerifiedComponent;
  let fixture: ComponentFixture<OnBoardingSuccessfullyVerifiedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnBoardingSuccessfullyVerifiedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnBoardingSuccessfullyVerifiedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
