
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';

const routes: Routes = [
  {
    path: '',
  component: NotAuthorizedComponent,
  data: { title: 'BnB Yacht' },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class NotAuthorizeRoutingModule { }
