import { HostBoatListingComponent } from './host-boat-listing/host-boat-listing.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoatelBookingsComponent } from './boatel-bookings/boatel-bookings.component';
import { HostOnboardingComponent } from './host-onboarding/host-onboarding.component';

const routes: Routes = [
  {
    path: "my-bookings", component: BoatelBookingsComponent
  },
  {
    path: "onboarding", component: HostOnboardingComponent
  },
  {
    path: "host-boat-listing", component: HostBoatListingComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HostRoutingModule { }
