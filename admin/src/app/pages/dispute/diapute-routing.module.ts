import { DisputeComponent } from './dispute.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisputeListingComponent } from './dispute-listing/dispute-listing.component';
import { DisputeDetailComponent } from './dispute-detail/dispute-detail.component';

const routes: Routes = [ {
  path: '',
  component: DisputeComponent,
  children: [
    {
      path: 'dispute',
      component: DisputeListingComponent,
    },
    {
      path : 'dispute/:id',
      component : DisputeDetailComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DisputeRoutingModule { }
export const routedComponents = [
  DisputeComponent,
  DisputeListingComponent,
  DisputeDetailComponent
];