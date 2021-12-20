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
import { AllReservationsComponent } from './all-reservations/all-reservations.component';
import { ReservationDetailComponent } from './reservation-detail/reservation-detail.component';
import { NgxStripeModule } from 'ngx-stripe';
import { environment } from 'src/environments/environment';
import { ReservationCancellationComponent } from './reservation-cancellation/reservation-cancellation.component';
import { ModifyReservationComponent } from './modify-reservation/modify-reservation.component';
import { CharterListingComponent } from './charter-listing/charter-listing.component';
import { EventListingComponent } from './event-listing/event-listing.component';
import { CharterDetailsComponent } from './charter-details/charter-details.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { ListReviewsComponent } from '../common/list-reviews/list-reviews.component';
import { NotFoundModule } from '../common/not-found-component/not-found.module';

@NgModule({
  declarations: [
    BoatListingComponent,
    BoatDetailsComponent,
    AllReservationsComponent,
    ReservationDetailComponent,
    ReservationCancellationComponent,
    ModifyReservationComponent,
    CharterListingComponent,
    EventListingComponent,
    CharterDetailsComponent,
    EventDetailsComponent,
    ListReviewsComponent
  ],
  imports: [
    BoatListingRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    GoogleMapsModule,
    CommonModule,
    SharedPipesModule,
    NgxStripeModule.forRoot(environment.stripeKey),
    NotFoundModule
  ],
    providers: [YachtSearchService, BookingService]
})
export class BoatListingModule { }
