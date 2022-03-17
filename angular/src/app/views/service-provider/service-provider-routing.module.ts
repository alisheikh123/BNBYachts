import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServiceProviderDetailComponent } from './service-provider-detail/service-provider-detail.component';
import { ServiceProviderInformationComponent } from './service-provider-information/service-provider-information.component';
import { ServiceProviderServicesComponent } from './service-provider-services/service-provider-services.component';
import { ServiceProviderComponent } from './service-provider/service-provider.component';

const routes: Routes = [
    {
        path: "", component: ServiceProviderComponent
      },
      {
        path: "services" , component:ServiceProviderServicesComponent
      },
      {
        path: "services/:serviceprovidertype" , component:ServiceProviderServicesComponent
      },
      {
        path: "services/:reservationid/:reservationtype/:serviceprovidertype" , component:ServiceProviderServicesComponent
      },
      { 
        path: "service-provider-information", component:ServiceProviderInformationComponent
      },
      { 
        path: "service-provider-information/:id/:type", component:ServiceProviderInformationComponent
      },
      { 
        path: "service-provider-detail/:id", component:ServiceProviderDetailComponent
      },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceProviderRoutingModule { }
