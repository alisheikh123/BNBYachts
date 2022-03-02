
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyProfileComponent } from '../common/user-profile/my-profile/my-profile.component';
import { UpdateProfileComponent } from '../common/user-profile/update-profile/update-profile.component';
import { CaptainComponent } from './captain/captain.component';

const routes: Routes = [
  {
    path: '',
  component: CaptainComponent,
  data: { title: 'BnB Yacht' },
  children: [
  {
    
    path: "captain", 
     loadChildren: () => import('../service-provider/service-provider.module').then(m => m.ServiceProviderModule)
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
]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class CaptainRoutingModule { }
