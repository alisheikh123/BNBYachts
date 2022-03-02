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
import { ServiceProviderServicesComponent } from './service-provider-services/service-provider-services.component';
import { SharedPipesModule } from 'src/app/shared/pipes/shared-pipes.module';
import { ServiceProviderInformationComponent } from './service-provider-information/service-provider-information.component';
import { YachtSearchService } from 'src/app/core/yacht-search/yacht-search.service';
import { ErrorService } from 'src/app/core/Error/error.service';
import { ServiceProviderDetailComponent } from './service-provider-detail/service-provider-detail.component';
import { GoogleMapsModule } from '@angular/google-maps';



@NgModule({
  declarations: [
    ServiceProviderComponent,
    ServiceProviderServicesComponent,
    ServiceProviderInformationComponent,
    ServiceProviderDetailComponent
    
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
    GoogleMapsModule,
    SharedPipesModule,
    CalendarModule

  ],
  providers: [ServiceProviderService , YachtSearchService, ErrorService]
})
export class ServiceProviderModule { }
