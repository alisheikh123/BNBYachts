import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceProviderComponent } from './service-provider/service-provider.component';
import { ServiceProviderRoutingModule } from './service-provider-routing.module';
import { NotFoundModule } from '../common/not-found-component/not-found.module';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { GoogleMapsModule } from '@angular/google-maps';
import { SharedPipesModule } from 'src/app/shared/pipes/shared-pipes.module';
import { YachtSearchService } from 'src/app/core/yacht-search/yacht-search.service';
import { ErrorService } from 'src/app/core/Error/error.service';



@NgModule({
  declarations: [
    ServiceProviderComponent,   
  ],
  imports: [
    CommonModule,
    NotFoundModule,
    ServiceProviderRoutingModule,
    SharedPipesModule,

  ],
  providers: []
})
export class ServiceProviderModule { }
