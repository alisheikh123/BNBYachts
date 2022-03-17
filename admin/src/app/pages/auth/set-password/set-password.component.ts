import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { UsersService } from '../../../core/backend/common/services/users.service';
import { AuthService } from '../../../core/mock/auth.service';

@Component({
  selector: 'ngx-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.scss']
})
export class SetPasswordComponent implements OnInit {
  email: string;
  id : string ;
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
    public usersService : UsersService,
    private toaster : NbToastrService,
    private fb: FormBuilder,
    private router: Router,
    private route : ActivatedRoute,
  )  {
    this.passwordValidator =
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z0-9$@$!%*?&].{7,}$';
   }

  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    this.email = this.route.snapshot.queryParams.username;
    this.id = this.route.snapshot.queryParams.id;
    this.registrationForm = this.fb.group(
      {
        Id : this.id,
        Email : this.email,
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
    this.hasError = false;
    var user = this.registrationForm.value;
    this.usersService.SetAdminPassword(user).subscribe(res => {
      if(res.status == true){
        this.router.navigate(['/login']);
      }
    });
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
