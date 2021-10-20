import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YachtSubscriptionComponent } from './yacht-subscription.component';

describe('YachtSubscriptionComponent', () => {
  let component: YachtSubscriptionComponent;
  let fixture: ComponentFixture<YachtSubscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YachtSubscriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YachtSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
