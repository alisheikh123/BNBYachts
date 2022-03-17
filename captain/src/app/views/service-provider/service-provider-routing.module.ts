import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServiceProviderDashboardComponent } from './service-provider-dashboard/service-provider-dashboard.component';
import { ServiceProviderComponent } from './service-provider/service-provider.component';

const routes: Routes = [
    {
        path: "", component: ServiceProviderComponent
      },
      {
        path: "captain-dashboard", component:ServiceProviderDashboardComponent
      },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceProviderRoutingModule { }
