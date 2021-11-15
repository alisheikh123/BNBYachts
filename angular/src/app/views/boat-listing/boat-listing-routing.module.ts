import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoatBookingPaymentComponent } from './boat-booking-payment/boat-booking-payment.component';
import { BoatDetailsComponent } from './boat-details/boat-details.component';
import { BoatListingComponent } from './boat-listing/boat-listing.component';

const routes: Routes = [
  {
    path: "", component: BoatListingComponent
  },
  {
    path: "boat-details/:id", component: BoatDetailsComponent
  },
  {
    path: "booking-payment/:id", component: BoatBookingPaymentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BoatListingRoutingModule { }
