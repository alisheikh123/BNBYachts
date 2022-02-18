import { NbToastrService } from '@nebular/theme';
import { UsersService } from './../../../core/backend/common/services/users.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/mock/auth.service';

@Component({
  selector: 'ngx-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  registrationForm: FormGroup;
  hasError: boolean;

  constructor(
    private modal: NgbModal,
    public activeModal: NgbActiveModal,
    public authService: AuthService,
    private toaster : NbToastrService,
    public usersService : UsersService,
    private fb: FormBuilder,
    private router: Router,
    // private toaster: ToastrService,
  )  { }

  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    this.registrationForm = this.fb.group(
      {
        FirstName: [
          '',
          Validators.required,
        ],
        LastName: [
          '',
          Validators.required,
        ],
        DOB: ['', Validators.compose([Validators.required])],
        Email: [
          '',
          Validators.compose([
            Validators.required,
            Validators.pattern(
              '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$'
            ),
            Validators.minLength(3),
            Validators.maxLength(320),
            this.isEmailExistsValidator()
          ]),
        ],
      },
    );
  }
  // Get form fields
  get signupForm() {
    return this.registrationForm.controls;
  }

  public isEmailExistsValidator(): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const email = group;
      if (email.value && email.valid) {
        this.authService.isEmailExists(email.value).subscribe(res => {
          if (res) {
            email.setErrors({ emailTaken: true });
          }
          else {
            if (email.hasError('emailTaken')) {
              email.setErrors(null);
            }
          }
        });
      }
      return null;
    };
  }

  submit() {
    this.hasError = false;
    var user = this.registrationForm.value;
    this.usersService.RegisterAdmin(user).subscribe((response: any) => {
      if (response.status == true) {
        this.activeModal.dismiss();
        this.toaster.success(response.message, "Admin");
      } else {
        this.toaster.warning(response.message, 'Sorry');
      }
    },
      (error) => {
        console.error('error caught in component')
        this.hasError = true;
      }
    );
  }

  getToday(): string {
    return new Date().toISOString().split('T')[0]
  }

  stopKeys(e: any) {
    e.preventDefault();
  }

}

