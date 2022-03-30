
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyProfileComponent } from '../common/user-profile/my-profile/my-profile.component';
import { UpdateProfileComponent } from '../common/user-profile/update-profile/update-profile.component';
import { ManagementComponent } from './management/management.component';

const routes: Routes = [
  {
    path: '',
  component: ManagementComponent,
  data: { title: 'BnB Yacht' },
  children: [
  {
    
    path: "management", 
     loadChildren: () => import('../service-provider/service-provider.module').then(m => m.ServiceProviderModule)
  },
  {
    
    path: "chats", 
     loadChildren: () => import('../chats/chats.module').then(m => m.ChatsModule)
  },
  {
    path: 'help-center',
    loadChildren: () => import('../help-center/help-center.module').then(m => m.HelpCenterModule)
  },
  {
    path: 'contracts',
    loadChildren: () => import('../contracts/contracts.module').then(m => m.ContractsModule)

  },
  {
    path: "my-profile", component: MyProfileComponent
  },
  {
    path: "update-profile/:id", component: UpdateProfileComponent
  },
  {
    path: 'reservations',
    loadChildren: () => import('../reservations/reservations.module').then(m => m.ReservationsModule)

  },
]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ManagementRoutingModule { }
