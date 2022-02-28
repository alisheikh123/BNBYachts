import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyProfileComponent } from './views/common/user-profile/my-profile/my-profile.component';
import { UpdateProfileComponent } from './views/common/user-profile/update-profile/update-profile.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./views/auth/auth.module').then(m => m.AuthAppModule)
  },
  {
    path: "my-profile", component: MyProfileComponent
  },
  {
    path: "update-profile/:id", component: UpdateProfileComponent
  },
  {
    path: 'payments',
    loadChildren: () => import('./views/payments/payments.module').then(m => m.PaymentsModule)
  },
  {
    path: 'help-center',
    loadChildren: () => import('./views/help-center/help-center.module').then(m => m.HelpCenterModule)
  },
  {
    
    path: "", 
    loadChildren: () => import('./views/service-provider/service-provider.module').then(m => m.ServiceProviderModule)
  },
  {
    path: 'contracts',
    loadChildren: () => import('./views/contracts/contracts.module').then(m => m.ContractsModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
