import { OAuthService } from 'angular-oauth2-oidc';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoginModalComponent } from './components/login-modal/login-modal.component';
import { SignupModalComponent } from './components/signup-modal/signup-modal.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  imports: [
    NgbModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [
      LoginModalComponent,
      SignupModalComponent,
      ForgotPasswordComponent
  ],
  providers: [
  

  ],
  
})
export class AuthAppModule { }
