import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BookingService } from 'src/app/core/Booking/booking.service';
import { YachtSearchService } from 'src/app/core/yacht-search/yacht-search.service';
import { SharedPipesModule } from 'src/app/shared/pipes/shared-pipes.module';
import { BoatDetailsComponent } from './boat-details/boat-details.component';
import { BoatListingRoutingModule } from './boat-listing-routing.module';
import { BoatListingComponent } from './boat-listing/boat-listing.component';
import { BoatBookingPaymentComponent } from './boat-booking-payment/boat-booking-payment.component';
import { NgxStripeModule } from 'ngx-stripe';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    BoatListingComponent,
    BoatDetailsComponent,
    BoatBookingPaymentComponent
  ],
  imports: [
    BoatListingRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    GoogleMapsModule, 
    CommonModule,
    SharedPipesModule,
    NgxStripeModule.forRoot(environment.stripeKey)
  ],
  providers: [YachtSearchService,BookingService]
})
export class BoatListingModule { }
