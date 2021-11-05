import { NgModule } from '@angular/core';
import { LoginModalComponent } from './components/login-modal/login-modal.component';
import { SignupModalComponent } from './components/signup-modal/signup-modal.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';

@NgModule({
  declarations: [
LoginModalComponent,
SignupModalComponent,
ForgotPasswordComponent
  ],
  imports: [],
  providers: [],
})
export class AuthModule { }
