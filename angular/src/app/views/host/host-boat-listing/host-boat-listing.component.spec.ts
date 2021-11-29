import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostBoatListingComponent } from './host-boat-listing.component';

describe('HostBoatListingComponent', () => {
  let component: HostBoatListingComponent;
  let fixture: ComponentFixture<HostBoatListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HostBoatListingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HostBoatListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
