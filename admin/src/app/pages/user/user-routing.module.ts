import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StatusComponent } from './status/status.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserListingComponent } from './user-listing/user-listing.component';
import { UserComponent } from './user.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      {
        path: 'users',
        component: UserListingComponent,
      },
      {
        path: 'users/:id',
        component : UserDetailComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
export const routedComponents = [
  UserComponent,
  UserListingComponent,
  UserDetailComponent,
  StatusComponent,
];
