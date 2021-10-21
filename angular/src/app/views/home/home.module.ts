import { NgModule } from '@angular/core';
import { FeaturedCitiesComponent } from './components/featured-cities/featured-cities.component';
import { HomeComponent } from './components/main-home/home.component';
import { YachtSearchComponent } from './components/yacht-search/yacht-search.component';
import { YachtServicesComponent } from './components/yacht-services/yacht-services.component';
import { YachtSubscriptionComponent } from './components/yacht-subscription/yacht-subscription.component';
import { HomeRoutingModule } from './home-routing.module';


@NgModule({
  declarations: [
    HomeComponent,
    YachtSearchComponent,
    YachtServicesComponent,
    YachtSubscriptionComponent,
    FeaturedCitiesComponent
  ],
  imports: [
    HomeRoutingModule
  ],
  providers: [],
  //bootstrap: [HomeComponent]
})
export class HomeModule { }
