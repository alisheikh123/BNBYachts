import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CalendarModule, DatePickerModule, DateTimePickerModule, TimePickerModule } from '@syncfusion/ej2-angular-calendars';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { AuthService } from 'src/app/core/auth/auth.service';
import { ContractsService } from 'src/app/core/contracts/contracts.service';
import { EventService } from 'src/app/core/Event/event.service';
import { TranslateService } from 'src/app/core/translate.service';
import { SharedPipesModule } from 'src/app/shared/pipes/shared-pipes.module';
import { PaginationModule } from '../common/pagination/pagination.module';
import { ContractFormComponent } from './components/contract-form/contract-form.component';
import { ContractListingComponent } from './components/contract-listing/contract-listing.component';
import { ContractsRoutingModule } from './contracts-routing.module';
import { ContractDetailComponent } from './components/contract-detail/contract-detail.component';
import { YachtSearchService } from 'src/app/core/yacht-search/yacht-search.service';
import { ContractEditComponent } from './components/contract-edit/contract-edit.component';


@NgModule({
  declarations: [
    ContractFormComponent,
    ContractListingComponent,
    ContractDetailComponent,
    ContractEditComponent
    ],
  imports: [
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    ContractsRoutingModule,
    GooglePlaceModule,
    DatePickerModule,
    CalendarModule,
    PaginationModule,
    DateTimePickerModule,
    TimePickerModule,
    SharedPipesModule
  ],
  exports:[ContractListingComponent],
  providers: [ContractsService,YachtSearchService],
})
export class ContractsModule { }
