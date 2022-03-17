import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { YachtSearchService } from 'src/app/core/yacht-search/yacht-search.service';
import { FeaturedCitiesComponent } from './components/featured-cities/featured-cities.component';
import { HomeComponent } from './components/main-home/home.component';
import { YachtSearchComponent } from './components/yacht-search/yacht-search.component';
import { YachtServicesComponent } from './components/yacht-services/yacht-services.component';
import { YachtSubscriptionComponent } from './components/yacht-subscription/yacht-subscription.component';
import { HomeRoutingModule } from './home-routing.module';
import { NoFoundModalComponent } from './components/no-found-modal/no-found-modal.component';
import { HostDashboardComponent } from './components/host-dashboard/host-dashboard.component';
import { SharedPipesModule } from 'src/app/shared/pipes/shared-pipes.module';
import { ChatComponent } from './components/Chat/chat/chat.component';
import { ChatUsersComponent } from './components/Chat/chat-users/chat-users.component';
import { NotFoundModule } from '../common/not-found-component/not-found.module';
import { CharterQuoteRequestComponent } from './components/QuoteRequest/charter-quote-request/charter-quote-request.component';
import { EventQuoteRequestComponent } from './components/QuoteRequest/event-quote-request/event-quote-request.component';
import { CalendarModule, DateRangePickerModule, DateTimePickerModule, TimePickerModule } from '@syncfusion/ej2-angular-calendars';
import { SwitchRoleComponent } from './components/switch-role/switch-role.component';


@NgModule({
  declarations: [
    HomeComponent,
    YachtSearchComponent,
    YachtServicesComponent,
    YachtSubscriptionComponent,
    FeaturedCitiesComponent,
    NoFoundModalComponent,
    HostDashboardComponent,
    ChatComponent,
    ChatUsersComponent,
    CharterQuoteRequestComponent,
    EventQuoteRequestComponent,
    SwitchRoleComponent
  ],
  imports: [
    HomeRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    GooglePlaceModule,
    SharedPipesModule,
    NotFoundModule,
    CalendarModule,
    TimePickerModule ,
    DateRangePickerModule,
    DateTimePickerModule,
  ],
  providers: [YachtSearchService],
  //bootstrap: [HomeComponent]
})
export class HomeModule { }
