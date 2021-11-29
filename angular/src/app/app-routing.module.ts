import { AuthAppModule } from './views/auth/auth.module';
import { ResetPasswordComponent } from './views/auth/components/reset-password/reset-password.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmEmailComponent } from './views/auth/components/confirm-email/confirm-email.component';
import { ActivateAccountComponent } from './views/auth/components/activate-account/activate-account.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./views/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./views/auth/auth.module').then(m => m.AuthAppModule)
  },
  {
    path: 'boat-listing',
    loadChildren: () => import('./views/boat-listing/boat-listing.module').then(m => m.BoatListingModule)
  },
  {
    path: 'my-bookings',
    loadChildren: () => import('./views/host/host.module').then(m => m.HostModule)
  },
  { path: 'activate-account', component: ActivateAccountComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
