import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CleaningOnBoardingComponent } from './cleaning-on-boarding/cleaning-on-boarding.component';
import { ServiceProviderDashboardComponent } from './service-provider-dashboard/service-provider-dashboard.component';
import { ServiceProviderComponent } from './service-provider/service-provider.component';

const routes: Routes = [
    {
        path: "", component: ServiceProviderComponent
      },
      {
        path: "service-provider-dashboard", component:ServiceProviderDashboardComponent
      },
      {
        path: "cleaning-onboarding", component:CleaningOnBoardingComponent
      },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceProviderRoutingModule { }
