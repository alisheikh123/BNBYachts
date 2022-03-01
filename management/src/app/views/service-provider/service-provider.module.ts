import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceProviderComponent } from './service-provider/service-provider.component';
import { ServiceProviderRoutingModule } from './service-provider-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule, DateRangePickerModule, DateTimePickerModule, TimePickerModule } from '@syncfusion/ej2-angular-calendars';
import { NotFoundModule } from '../common/not-found-component/not-found.module';
import { ServiceProviderService } from 'src/app/core/serviceprovider/serviceprovider.service';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { ServiceProviderDashboardComponent } from './service-provider-dashboard/service-provider-dashboard.component';
import { UpcomingEventsComponent } from './upcoming-events/upcoming-events.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { SharedPipesModule } from 'src/app/shared/pipes/shared-pipes.module';
import { YachtSearchService } from 'src/app/core/yacht-search/yacht-search.service';
import { ErrorService } from 'src/app/core/Error/error.service';
import { ManagementOnboardingComponent } from './management-onboarding/management-onboarding.component';
import { NgxStripeModule } from 'ngx-stripe';
import { environment } from 'src/environments/environment';
import { CarouselModule } from 'primeng/carousel';
import { NgOtpInputModule } from 'ng-otp-input';



@NgModule({
  declarations: [
    ServiceProviderComponent,
    ManagementOnboardingComponent,
    ServiceProviderDashboardComponent,
    UpcomingEventsComponent,
    ContactListComponent
  ],
  imports: [
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    TimePickerModule ,
    DateRangePickerModule,
    DateTimePickerModule,
    NotFoundModule,
    ServiceProviderRoutingModule,
    GooglePlaceModule,
    SharedPipesModule,
    CalendarModule,
    NgxStripeModule.forRoot(environment.stripeKey),
    NgOtpInputModule,
    CarouselModule
  ],
  providers: [ServiceProviderService , YachtSearchService, ErrorService]
})
export class ServiceProviderModule { }
