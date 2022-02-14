import { DisputeComponent } from './dispute.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisputeListingComponent } from './dispute-listing/dispute-listing.component';

const routes: Routes = [ {
  path: '',
  component: DisputeComponent,
  children: [
    {
      path: 'dispute',
      component: DisputeListingComponent,
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DisputeRoutingModule { }
export const routedComponents = [
  DisputeComponent,
  DisputeListingComponent
];