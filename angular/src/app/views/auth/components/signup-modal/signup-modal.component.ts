import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginModalComponent } from '../login-modal/login-modal.component';
import { AbstractControl,FormBuilder,FormGroup,ValidationErrors,ValidatorFn,Validators,} from '@angular/forms';
import { throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { ConfirmEmailComponent } from '../confirm-email/confirm-email.component';
import Swal from 'sweetalert2';
import { UserModel } from '../../model/UserModel';

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

  constructor(
    private modal: NgbModal,
    public activeModal: NgbActiveModal,
    public authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.passwordValidator =
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}$';
  }

  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    this.registrationForm = this.fb.group(
      {
        FirstName: [
          '',
          Validators.compose([
            Validators.required
          ]),
        ],
        LastName: [
          '',
          Validators.compose([
            Validators.required
          ]),
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
          ]),
        ],
        Password: [
          '',
          Validators.compose([Validators.pattern(this.passwordValidator)]),
        ],
        cPassword: ['', Validators.compose([Validators.required])],
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

  submit() {
    this.hasError = false;
    const result = {};
    const newUser = new UserModel();
    newUser.setUser(result);
    var user = this.registrationForm.value;

    this.authService.registerUser(user).subscribe((response: any) => {
      if (response.status == true) {
        this.activeModal.dismiss();
        let modalRef = this.modal.open(ConfirmEmailComponent, {
          windowClass: 'custom-modal custom-small-modal',
        });
        modalRef.componentInstance.username = user.Email;
      } else {
        this.hasError = true;
        Swal.fire('Error', response.message, 'error');
      }
    });
  }

  login() {
    this.activeModal.dismiss();
    let modalRef = this.modal.open(ConfirmEmailComponent, {
      windowClass: 'custom-modal custom-small-modal',
    });
  }
}
export const passwordMatchingValidatior: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.get('Password');
  const confirmPassword = control.get('cPassword');

  return password?.value === confirmPassword?.value
    ? null
    : { notmatched: true };
};

