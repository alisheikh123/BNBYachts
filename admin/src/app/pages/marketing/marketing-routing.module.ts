import { MarketingComponent } from './marketing.component';
import { RouterModule, Routes } from "@angular/router";
import { NgModule } from '@angular/core';
import { FeaturedCitiesComponent } from './featured-cities/featured-cities.component';
import { MarketingPageComponent } from './marketing-page/marketing-page.component';


const routes: Routes = [
    {
      path: '',
      component: MarketingComponent,
      children: [
        {
          path: 'cities',
          component: FeaturedCitiesComponent,
        },
        {
          path: 'marketing',
          component : MarketingPageComponent
        }
      ]
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })

export class MarketingRoutingModule { }
export const routedComponents = [
    MarketingComponent,
    FeaturedCitiesComponent,
    MarketingPageComponent
 ];