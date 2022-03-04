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
import { PaginationModule } from '../common/pagination/pagination.module';
import { CalendarModule } from '@syncfusion/ej2-angular-calendars';
import { BookingFilterComponent } from './booking-filter/booking-filter.component';
import { CharterReservationDetailComponent } from './charter-reservation-detail/charter-reservation-detail.component';
import { EventReservationDetailComponent } from './event-reservation-detail/event-reservation-detail.component';
import { ContractsModule } from '../contracts/contracts.module';
import { CharterReservationCancellationComponent } from './charter-reservation-cancellation/charter-reservation-cancellation.component';
import { EventModifyReservationComponent } from './event-modify-reservation/event-modify-reservation.component';
import { EventReservationCancellationComponent } from './event-reservation-cancellation/event-reservation-cancellation.component';

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
    ListReviewsComponent,
    BookingFilterComponent,
    CharterReservationDetailComponent,
    EventReservationDetailComponent,
    CharterReservationCancellationComponent,
    EventModifyReservationComponent,
    EventReservationCancellationComponent

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
    NotFoundModule,
    PaginationModule,
    CalendarModule,
    ContractsModule
  ],
    providers: [YachtSearchService, BookingService],
    exports: [BoatListingModule.rootComponent,BoatListingModule.rootReviewComponent],
    entryComponents: [BoatListingModule.rootComponent,BoatListingModule.rootReviewComponent],
})
export class BoatListingModule {
  static rootComponent = BookingFilterComponent
  static rootReviewComponent = ListReviewsComponent
}
