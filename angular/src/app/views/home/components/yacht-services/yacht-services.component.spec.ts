import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YachtServicesComponent } from './yacht-services.component';

describe('YachtServicesComponent', () => {
  let component: YachtServicesComponent;
  let fixture: ComponentFixture<YachtServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YachtServicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YachtServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
