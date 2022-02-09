import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserService } from 'src/app/services/user.service';
import { UserListingComponent } from './user-listing/user-listing.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UserListingComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AccordionModule.forRoot(),
    PaginationModule.forRoot(),
    UserRoutingModule
  ],
  providers: [
    UserService,
  ],
  exports:[
    UserListingComponent
  ]
})
export class UserModule { }
