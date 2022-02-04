import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginModalComponent } from '../login-modal/login-modal.component';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators, } from '@angular/forms';
import { throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { ConfirmEmailComponent } from '../confirm-email/confirm-email.component';
import { UserModel } from '../../model/UserModel';
import { ToastrService } from 'ngx-toastr';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-signup-modal',
  templateUrl: './signup-modal.component.html',
  styleUrls: ['./signup-modal.component.scss'],
})
export class SignupModalComponent implements OnInit {
  registrationForm: FormGroup;
  hasError: boolean;
  passwordValidator: string;
  passwordStrength: number;
  passwordViewer = {
    passwordFieldTextType: false,
    confirmPasswordFieldTextType: false
  };

  constructor(
    private modal: NgbModal,
    public activeModal: NgbActiveModal,
    public authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private toaster: ToastrService,
    private oidcSecurityService: OidcSecurityService
  ) {
    this.passwordValidator =  
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{7,}$';
  }

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
        Password: [
          '',
          Validators.compose([Validators.pattern(this.passwordValidator)]),
        ],
        confirmPassword: ['', Validators.compose([Validators.required])],
        agree: [false, Validators.compose([Validators.required])],
      },
      {
        validator: passwordMatchingValidatior,
      }
    );
  }
  // Get form fields
  get signupForm() {
    return this.registrationForm.controls;
  }

  // isEmailExistsValidator(): ValidatorFn {
  //   return (control: AbstractControl): ValidationErrors | null => {
  //     if(control.valid){
  //       this.authService.isEmailExists(control.value).subscribe(res => {
  //         return res
  //           ? null
  //           : { emailTaken: true };
  //       });
  //     }
  //     return null;
  //   }
  // }
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

    this.authService.registerUser(user).subscribe((response: any) => {
      if (response.status == true) {
        this.activeModal.dismiss();
        let modalRef = this.modal.open(ConfirmEmailComponent, {
          windowClass: 'custom-modal custom-small-modal',
          centered: true
        });
        modalRef.componentInstance.username = user.Email;
      } else {
        this.hasError = true;
        this.toaster.warning(response.message, 'Sorry');
      }
    },
      (error) => {                              //Error callback
        console.error('error caught in component')
        this.hasError = true;
      }
    );
  }

  login() {
    this.activeModal.dismiss();
    this.oidcSecurityService.authorize();
    // let modalRef = this.modal.open(ConfirmEmailComponent, {
    //   windowClass: 'custom-modal custom-small-modal',
    // });
  }
  getToday(): string {
    return new Date().toISOString().split('T')[0]
  }

  toggleFieldTextType(isPassword: boolean) {
    isPassword ? this.passwordViewer.passwordFieldTextType = !this.passwordViewer.passwordFieldTextType
      : this.passwordViewer.confirmPasswordFieldTextType = !this.passwordViewer.confirmPasswordFieldTextType;
  }
  onPasswordChange() {
    if (this.registrationForm.controls.Password.value == this.registrationForm.controls.confirmPassword.value) {
      this.registrationForm.controls.confirmPassword.setErrors(null);
    } else {
      this.registrationForm.controls.confirmPassword.setErrors({ mismatch: true });
    }
  }
  stopKeys(e: any) {
    e.preventDefault();
  }

}
export const passwordMatchingValidatior: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.get('Password');
  const confirmPassword = control.get('confirmPassword');
  return password?.value === confirmPassword?.value
    ? null
    : { notmatched: true };
};


