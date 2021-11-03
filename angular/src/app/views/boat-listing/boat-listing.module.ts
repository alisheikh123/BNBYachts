import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { YachtSearchService } from 'src/app/core/yacht-search/yacht-search.service';
import { SharedPipesModule } from 'src/app/shared/pipes/shared-pipes.module';
import { BoatDetailsComponent } from './boat-details/boat-details.component';
import { BoatListingRoutingModule } from './boat-listing-routing.module';
import { BoatListingComponent } from './boat-listing/boat-listing.component';

@NgModule({
  declarations: [
    BoatListingComponent,
    BoatDetailsComponent
  ],
  imports: [
    BoatListingRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    GoogleMapsModule, 
    CommonModule,
    SharedPipesModule
  ],
  providers: [YachtSearchService]
})
export class BoatListingModule { }
