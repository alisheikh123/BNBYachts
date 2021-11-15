import { ReservationDetailComponent } from './reservation-detail/reservation-detail.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllReservationsComponent } from './all-reservations/all-reservations.component';
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
    path: "all-reservations", component: AllReservationsComponent
  },
  {
    path: "reservation-detail/:id", component: ReservationDetailComponent
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
