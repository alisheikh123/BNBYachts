import { AuthService } from './../../core/auth/auth.service';
import { AuthRoutingModule } from './auth-routing.module';
import { OAuthService } from 'angular-oauth2-oidc';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoginModalComponent } from './components/login-modal/login-modal.component';
import { SignupModalComponent } from './components/signup-modal/signup-modal.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';


@NgModule({
  imports: [
    NgbModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AuthRoutingModule
  ],
  declarations: [
      LoginModalComponent,
      SignupModalComponent,
      ForgotPasswordComponent,
      ResetPasswordComponent
  ],
  providers: [
  AuthService

  ],
  
})
export class AuthAppModule { }
