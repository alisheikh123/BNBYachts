import { CharterCreationComponentComponent } from './charter-creation-component/charter-creation-component.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoatelBookingsComponent } from './boatel-bookings/boatel-bookings.component';
import { BoatLoationSettingsComponent } from './boat-loation-settings/boat-loation-settings.component';
import { HostOnboardingComponent } from './host-onboarding/host-onboarding.component';
import { HostBoatListingComponent } from './host-boat-listing/host-boat-listing.component';
import { BoatEditComponent } from './boat-edit/boat-edit.component';
import { EventCreationComponent } from './event-creation/event-creation.component';

const routes: Routes = [
  {
    path: "my-bookings", component: BoatelBookingsComponent
  },
  {
    path: "onboarding", component: HostOnboardingComponent
  },
  {
    path: "boat-add", component: HostOnboardingComponent
  },
  {
    path: "host-boat-listing", component: HostBoatListingComponent
  }
  ,
  {
    path: "boat-location/:id", component: BoatLoationSettingsComponent
  }
  ,
  {
    path: "boat-edit/:id", component: BoatEditComponent
  },
  {
    path: "event-creation", component: EventCreationComponent
  }
  ,
  {
    path: "charter-creation", component: CharterCreationComponentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HostRoutingModule { }
