import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
 
import { LoginModalComponent } from './login-modal/login-modal.component';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
 
 
@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  declarations: [
    LoginModalComponent
  ],
  providers: [
    AuthService,
  ],
  exports:[
    LoginModalComponent
  ]
})
export class AuthAppModule { }
