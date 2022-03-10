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
import { ConfirmEmailComponent } from './components/confirm-email/confirm-email.component';
import { ActivateAccountComponent } from './components/activate-account/activate-account.component';
import { NotLoggedInComponent } from './components/not-logged-in/not-logged-in.component';
import { SharedPipesModule } from 'src/app/shared/pipes/shared-pipes.module';
import { LoginComponent } from './components/login/login.component';
import { ServiceProviderService } from 'src/app/core/serviceprovider/serviceprovider.service';

@NgModule({
  imports: [
    NgbModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AuthRoutingModule,
    SharedPipesModule
  ],
  declarations: [
      LoginModalComponent,
      SignupModalComponent,
      ForgotPasswordComponent,
      ResetPasswordComponent,
      ConfirmEmailComponent,
      ActivateAccountComponent,
      NotLoggedInComponent,
      LoginComponent
  ],
  providers: [
  AuthService,
  ServiceProviderService

  ],
  
})
export class AuthAppModule { }
