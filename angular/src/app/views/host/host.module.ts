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
import { TimePickerModule,DateRangePickerModule, DateTimePickerModule  } from '@syncfusion/ej2-angular-calendars';
import { HostBoatListingComponent } from './host-boat-listing/host-boat-listing.component';
import { BoatLoationSettingsComponent } from './boat-loation-settings/boat-loation-settings.component';
import { BoatEditComponent } from './boat-edit/boat-edit.component';
import { EventCreationComponent } from './event-creation/event-creation.component';



@NgModule({
  declarations: [
BoatelBookingsComponent,
HostOnboardingComponent,
AddDialogComponent,
HostBoatListingComponent,
BoatLoationSettingsComponent,
BoatEditComponent,
EventCreationComponent, 
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
    DateTimePickerModule
  ],
  providers: [YachtSearchService,ReservationService]
})
export class HostModule { }
