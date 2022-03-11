import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchRoleComponent } from './switch-role.component';

describe('SwitchRoleComponent', () => {
  let component: SwitchRoleComponent;
  let fixture: ComponentFixture<SwitchRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwitchRoleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwitchRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
