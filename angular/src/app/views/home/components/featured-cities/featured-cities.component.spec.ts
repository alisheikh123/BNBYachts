import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedCitiesComponent } from './featured-cities.component';

describe('FeaturedCitiesComponent', () => {
  let component: FeaturedCitiesComponent;
  let fixture: ComponentFixture<FeaturedCitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeaturedCitiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturedCitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
