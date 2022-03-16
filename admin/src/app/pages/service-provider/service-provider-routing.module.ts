import { ServiceProviderComponent } from './service-provider.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServiceProviderDetailComponent } from './service-provider-detail/service-provider-detail.component';
import { ServiceProviderListingComponent } from './service-provider-listing/service-provider-listing.component';
import { SpStatusComponent } from './sp-status/sp-status.component';

const routes: Routes = [
  {
    path: '',
    component: ServiceProviderComponent,
    children: [
      {
        path: 'services',
        component: ServiceProviderListingComponent,
      },
      {
        path: 'service/:id',
        component : ServiceProviderDetailComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceProviderRoutingModule { }
export const routedComponents = [
  ServiceProviderListingComponent,
  ServiceProviderDetailComponent,
  ServiceProviderComponent,
  SpStatusComponent
];
