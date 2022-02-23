import { FaqsComponent } from './faqs.component';
import { RouterModule, Routes } from "@angular/router";
import { FaqsListingComponent } from './faqs-listing/faqs-listing.component';
import { NgModule } from '@angular/core';


const routes: Routes = [
    {
      path: '',
      component: FaqsComponent,
      children: [
        {
          path: 'faqs-listing',
          component: FaqsListingComponent,
        },
      ]
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })

export class FaqsRoutingModule { }
export const routedComponents = [
    FaqsComponent,
    FaqsListingComponent,
 ];