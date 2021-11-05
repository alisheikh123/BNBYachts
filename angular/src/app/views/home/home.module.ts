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


@NgModule({
  declarations: [
    HomeComponent,
    YachtSearchComponent,
    YachtServicesComponent,
    YachtSubscriptionComponent,
    FeaturedCitiesComponent,
    NoFoundModalComponent,
  ],
  imports: [
    HomeRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    GooglePlaceModule
  ],
  providers: [YachtSearchService],
  //bootstrap: [HomeComponent]
})
export class HomeModule { }
