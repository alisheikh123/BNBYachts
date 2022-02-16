import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContractDetailComponent } from './components/contract-detail/contract-detail.component';
import { ContractEditComponent } from './components/contract-edit/contract-edit.component';
import { ContractFormComponent } from './components/contract-form/contract-form.component';
import { ContractListingComponent } from './components/contract-listing/contract-listing.component';

const routes: Routes = [ 
  {
    path: "add/:userId", component:ContractFormComponent
  },
  {
    path: "", component:ContractListingComponent
  },
  {
    path: "contract/:contractId", component:ContractDetailComponent
  },
  {
    path: "edit/:contractId", component:ContractEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContractsRoutingModule { }
