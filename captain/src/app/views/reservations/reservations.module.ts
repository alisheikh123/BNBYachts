import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule, DateRangePickerModule, DateTimePickerModule, TimePickerModule } from '@syncfusion/ej2-angular-calendars';
import { NotFoundModule } from '../common/not-found-component/not-found.module';
import { ReservationsRoutingModule } from './reservations-routing.module';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { SharedPipesModule } from 'src/app/shared/pipes/shared-pipes.module';
import { ChatsModule } from '../chats/chats.module';
import { ServiceProviderService } from 'src/app/core/serviceprovider/serviceprovider.service';
import { YachtSearchService } from 'src/app/core/yacht-search/yacht-search.service';
import { ErrorService } from 'src/app/core/Error/error.service';
import { ReservationComponent } from './reservation/reservation.component';
import { ContractsModule } from '../contracts/contracts.module';
import { ReservationContractComponent } from './reservation-contract/reservation-contract.component';



@NgModule({
  declarations: [
    ReservationComponent,
    ReservationContractComponent
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
    ReservationsRoutingModule,
    GooglePlaceModule,
    SharedPipesModule,
    CalendarModule,
    ChatsModule,
    ContractsModule
  ],
  providers: [ServiceProviderService , YachtSearchService, ErrorService]
})
export class ReservationsModule { }
