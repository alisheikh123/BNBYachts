import { HostComponent } from './host.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HostListingComponent } from './host-listing/host-listing.component';
import { HostDetailComponent } from './host-detail/host-detail.component';

const routes: Routes = [
  {
    path: '',
    component: HostComponent,
    children: [
      {
        path: 'host',
        component: HostListingComponent,
      },
      {
        path : 'host/:id',
        component : HostDetailComponent
      }
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HostRoutingModule { }
export const routedComponents = [
  HostComponent,
  HostListingComponent,
  HostDetailComponent
];
