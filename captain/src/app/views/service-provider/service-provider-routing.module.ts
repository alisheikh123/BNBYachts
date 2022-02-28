import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CaptainOnboardingComponent } from './captain-onboarding/captain-onboarding.component';
import { ServiceProviderDashboardComponent } from './service-provider-dashboard/service-provider-dashboard.component';
import { ServiceProviderComponent } from './service-provider/service-provider.component';

const routes: Routes = [
    {
        path: "", component: ServiceProviderComponent
      },
      {
        path: "captain-onboarding", component: CaptainOnboardingComponent
      },
      {
        path: "service-provider-dashboard", component:ServiceProviderDashboardComponent
      },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceProviderRoutingModule { }
