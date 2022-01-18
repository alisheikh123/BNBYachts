import { ModifyReservationComponent } from './modify-reservation/modify-reservation.component';
import { ReservationCancellationComponent } from './reservation-cancellation/reservation-cancellation.component';
import { ReservationDetailComponent } from './reservation-detail/reservation-detail.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllReservationsComponent } from './all-reservations/all-reservations.component';
import { BoatDetailsComponent } from './boat-details/boat-details.component';
import { BoatListingComponent } from './boat-listing/boat-listing.component';
import { EventListingComponent } from './event-listing/event-listing.component';
import { CharterListingComponent } from './charter-listing/charter-listing.component';
import { CharterDetailsComponent } from './charter-details/charter-details.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { EventReservationDetailComponent } from './event-reservation-detail/event-reservation-detail.component';
import { CharterReservationDetailComponent } from './charter-reservation-detail/charter-reservation-detail.component';

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
    path: "reservation-cancellation/:id", component: ReservationCancellationComponent
  },
  {
    path: "modify-reservation/:id", component: ModifyReservationComponent
  },
  {
    path: "charter-reservation-detail/:id", component: CharterReservationDetailComponent
  },
  {
    path: "event-reservation-detail/:id", component: EventReservationDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BoatListingRoutingModule { }
