import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllChartersListingComponent } from './all-charters-listing.component';

describe('AllChartersListingComponent', () => {
  let component: AllChartersListingComponent;
  let fixture: ComponentFixture<AllChartersListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllChartersListingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllChartersListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
