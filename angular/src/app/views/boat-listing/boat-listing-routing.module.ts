import { ModifyReservationComponent } from './modify-reservation/modify-reservation.component';
import { ReservationCancellationComponent } from './reservation-cancellation/reservation-cancellation.component';
import { ReservationDetailComponent } from './reservation-detail/reservation-detail.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllReservationsComponent } from './all-reservations/all-reservations.component';
import { BoatBookingPaymentComponent } from './boat-booking-payment/boat-booking-payment.component';
import { BoatDetailsComponent } from './boat-details/boat-details.component';
import { BoatListingComponent } from './boat-listing/boat-listing.component';
import { EventListingComponent } from './event-listing/event-listing.component';
import { CharterListingComponent } from './charter-listing/charter-listing.component';
import { CharterDetailsComponent } from './charter-details/charter-details.component';
import { EventDetailsComponent } from './event-details/event-details.component';

const routes: Routes = [
  {
    path: "boatel", component: BoatListingComponent
  },
  {
    path: "charter", component: CharterListingComponent
  }, 
  {
    path: "events", component: EventListingComponent
  },
  {
    path: "boatel-details/:id", component: BoatDetailsComponent
  },
  {
    path: "charter-details/:id", component: CharterDetailsComponent
  },
  {
    path: "event-details/:id", component:EventDetailsComponent
  },
  {
    path: "all-reservations", component: AllReservationsComponent
  },
  {
    path: "reservation-detail/:id", component: ReservationDetailComponent
  },
  {
    path: "booking-payment/:id", component: BoatBookingPaymentComponent
  },
  {
    path: "reservation-cancellation/:id", component: ReservationCancellationComponent
  },
  {
    path: "modify-reservation/:id/:userId", component: ModifyReservationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BoatListingRoutingModule { }
