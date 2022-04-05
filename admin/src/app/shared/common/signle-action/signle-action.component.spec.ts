import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignleActionComponent } from './signle-action.component';

describe('SignleActionComponent', () => {
  let component: SignleActionComponent;
  let fixture: ComponentFixture<SignleActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignleActionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignleActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
