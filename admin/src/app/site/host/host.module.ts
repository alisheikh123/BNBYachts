import { UserService } from './../../services/user.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HostRoutingModule } from './host-routing.module';
import { HostListingComponent } from './host-listing/host-listing.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HostListingComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AccordionModule.forRoot(),
    PaginationModule.forRoot(),
    HostRoutingModule
  ],
  providers: [
    UserService,
  ],
  exports:[
    HostListingComponent
  ]
})
export class HostModule { }
