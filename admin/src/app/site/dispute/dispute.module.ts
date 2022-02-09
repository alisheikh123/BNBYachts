import { DisputeService } from './../../services/site/dispute.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisputeRoutingModule } from './diapute-routing.module';
import { DisputeListingComponent } from './dispute-listing/dispute-listing.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DisputeListingComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AccordionModule.forRoot(),
    PaginationModule.forRoot(),
    DisputeRoutingModule
  ],
  providers: [
    DisputeService,
  ],
  // exports:[
  //   DisputeListingComponent
  // ]
})
export class DisputeModule { }
