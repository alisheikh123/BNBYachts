import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReservationService } from 'src/app/core/host/reservation.service';
import { YachtSearchService } from 'src/app/core/yacht-search/yacht-search.service';
import { SharedPipesModule } from 'src/app/shared/pipes/shared-pipes.module';
import { BoatelBookingsComponent } from './boatel-bookings/boatel-bookings.component';
import { HostRoutingModule } from './host-routing.module';
import { HostOnboardingComponent } from './host-onboarding/host-onboarding.component';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { AddDialogComponent } from './host-onboarding/add-dialog/add-dialog.component';
import { TimePickerModule,DateRangePickerModule, CalendarModule, DateTimePickerModule  } from '@syncfusion/ej2-angular-calendars';
import { HostBoatListingComponent } from './host-boat-listing/host-boat-listing.component';
import { BoatLoationSettingsComponent } from './boat-loation-settings/boat-loation-settings.component';
import { BoatEditComponent } from './boat-edit/boat-edit.component';
import { BoatListingComponent } from './host-boat-listing/boat-listing/boat-listing.component';
import { EventCreationComponent } from './event-creation/event-creation.component';
import { EventCreationSuccessModalComponent } from './event-creation/event-creation-success-modal/event-creation-success-modal.component';
import { AllEventsListingComponent } from './host-boat-listing/all-events-listing/all-events-listing.component';
import { AllChartersListingComponent } from './host-boat-listing/all-charters-listing/all-charters-listing.component';
import { NotFoundModule } from '../common/not-found-component/not-found.module';
import { BookingRequestsComponent } from './boatel-bookings/booking-requests/booking-requests.component';
import { BookedServicesComponent } from './boatel-bookings/booked-services/booked-services.component';
import { DroppedServicesComponent } from './boatel-bookings/dropped-services/dropped-services.component';
import { CharterCreationComponentComponent } from './charter-creation-component/charter-creation-component.component';



@NgModule({
  declarations: [
BoatelBookingsComponent,
HostOnboardingComponent,
AddDialogComponent,
HostBoatListingComponent,
BoatLoationSettingsComponent,
BoatEditComponent,
BoatListingComponent,
EventCreationComponent,
EventCreationSuccessModalComponent,
AllEventsListingComponent,
AllChartersListingComponent,
BookingRequestsComponent,
BookedServicesComponent,
DroppedServicesComponent,
BoatLoationSettingsComponent,
CharterCreationComponentComponent
  ],
  imports: [
    HostRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    GoogleMapsModule,
    CommonModule,
    SharedPipesModule,
    GooglePlaceModule,
    TimePickerModule ,
    DateRangePickerModule,
    DateTimePickerModule,
    NotFoundModule
  ],
  providers: [YachtSearchService,ReservationService]
})
export class HostModule { }
