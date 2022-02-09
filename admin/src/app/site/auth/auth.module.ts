import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { AccordionModule } from 'ngx-bootstrap/accordion';
 
 
@NgModule({
  imports: [
    NgbModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AccordionModule.forRoot(),
    PaginationModule.forRoot(),
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
