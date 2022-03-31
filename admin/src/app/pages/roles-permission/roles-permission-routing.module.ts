import { RolesListComponent } from './roles-list/roles-list.component';
import { RolesPermissionComponent } from './roles-permission.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: RolesPermissionComponent,
    children: [
      {
        path: 'roles',
        component: RolesListComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolesPermissionRoutingModule { }
export const routedComponents = [
     RolesPermissionComponent,
     RolesListComponent
];
