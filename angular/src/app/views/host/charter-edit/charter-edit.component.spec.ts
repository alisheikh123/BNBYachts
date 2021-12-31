import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharterEditComponent } from './charter-edit.component';

describe('CharterEditComponent', () => {
  let component: CharterEditComponent;
  let fixture: ComponentFixture<CharterEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharterEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharterEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
