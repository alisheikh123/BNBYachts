import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoFoundModalComponent } from './no-found-modal.component';

describe('NoFoundModalComponent', () => {
  let component: NoFoundModalComponent;
  let fixture: ComponentFixture<NoFoundModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoFoundModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoFoundModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
