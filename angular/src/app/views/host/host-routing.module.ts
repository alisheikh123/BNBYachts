import { HostBoatListingComponent } from './host-boat-listing/host-boat-listing.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoatelBookingsComponent } from './boatel-bookings/boatel-bookings.component';

const routes: Routes = [
  {
    path: "", component: BoatelBookingsComponent
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
