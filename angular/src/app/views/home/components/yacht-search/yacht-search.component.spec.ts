import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YachtSearchComponent } from './yacht-search.component';

describe('YachtSearchComponent', () => {
  let component: YachtSearchComponent;
  let fixture: ComponentFixture<YachtSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YachtSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YachtSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
