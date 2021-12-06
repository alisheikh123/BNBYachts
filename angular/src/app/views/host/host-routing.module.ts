import { HostBoatListingComponent } from './host-boat-listing/host-boat-listing.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoatelBookingsComponent } from './boatel-bookings/boatel-bookings.component';
import { HostOnboardingComponent } from './host-onboarding/host-onboarding.component';
import { BoatLoationSettingsComponent } from './boat-loation-settings/boat-loation-settings.component';

const routes: Routes = [
  {
    path: "my-bookings", component: BoatelBookingsComponent
  },
  {
    path: "onboarding", component: HostOnboardingComponent
  },
  {
    path: "host-boat-listing", component: HostBoatListingComponent
  }
  ,
  {
    path: "boat-location/:id", component: BoatLoationSettingsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HostRoutingModule { }
