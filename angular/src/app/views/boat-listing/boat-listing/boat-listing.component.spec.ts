import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoatListingComponent } from './boat-listing.component';

describe('BoatListingComponent', () => {
  let component: BoatListingComponent;
  let fixture: ComponentFixture<BoatListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoatListingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoatListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
