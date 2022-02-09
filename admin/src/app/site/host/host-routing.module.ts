import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HostListingComponent } from './host-listing/host-listing.component';

const routes: Routes = [
  { path: 'host', component: HostListingComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HostRoutingModule { }
