import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivateAccountComponent } from './views/auth/components/activate-account/activate-account.component';
import { TryHostingComponent } from './views/common/try-hosting/try-hosting.component';
import { MyProfileComponent } from './views/common/user-profile/my-profile/my-profile.component';
import { UpdateProfileComponent } from './views/common/user-profile/update-profile/update-profile.component';
import { ChatComponent } from './views/home/components/Chat/chat/chat.component';

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
    path: 'host',
    loadChildren: () => import('./views/host/host.module').then(m => m.HostModule)
  },
  { path: 'activate-account', component: ActivateAccountComponent },
  {
    path: "try-hosting", component: TryHostingComponent
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
    path: 'wishlists',
    loadChildren: () => import('./views/wishlists/wishlists.module').then(m => m.WishListsModule)
  },
  {
    path: "chat/:id", component: ChatComponent
  },
  {
    path: "chat", component: ChatComponent
  },
  {
    path: 'help-center',
    loadChildren: () => import('./views/help-center/help-center.module').then(m => m.HelpCenterModule)
  },
  {
    path: 'contracts',
    loadChildren: () => import('./views/contracts/contracts.module').then(m => m.ContractsModule)
  },
  {
    
    path: "service-provider", 
    loadChildren: () => import('./views/service-provider/service-provider.module').then(m => m.ServiceProviderModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
