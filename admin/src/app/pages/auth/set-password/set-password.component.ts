import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsersService } from '../../../core/backend/common/services/users.service';
import { AuthService } from '../../../core/mock/auth.service';

@Component({
  selector: 'ngx-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.scss']
})
export class SetPasswordComponent implements OnInit {

  registrationForm: FormGroup;
  hasError: boolean;
  passwordValidator: string;
  passwordStrength: number;
  passwordViewer = {
    passwordFieldTextType: false,
    confirmPasswordFieldTextType: false
  };
  constructor(
    public authService: AuthService,
    private toaster : NbToastrService,
    public usersService : UsersService,
    private fb: FormBuilder,
    private router: Router,
    // private toaster: ToastrService,
  )  {
    this.passwordValidator =
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z0-9$@$!%*?&].{7,}$';
   }

  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    this.registrationForm = this.fb.group(
      {
        Email: [
          '',
          Validators.compose([
            Validators.required,
            Validators.pattern(
              '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$'
            ),
            Validators.minLength(3),
            Validators.maxLength(320),
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
    },
    );
  }
  // Get form fields
  get signupForm() {
    return this.registrationForm.controls;
  }

  submit() {
    debugger;
    this.hasError = false;
    var user = this.registrationForm.value;
    this.usersService.SetAdminPassword(user).subscribe(res => {
      if(res.status == 200){
        this.toaster.primary(res.message , 'Set Password')
        // this.router.navigate(['/pages/dashboard']);
      }else{
        this.toaster.danger(res.message , 'Set Password')
      }
    });
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
