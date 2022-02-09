import { LoginModalComponent } from './site/auth/login-modal/login-modal.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeDashboardComponent } from './reports/home-dashboard/home-dashboard.component';
import { RoutesGuard } from './routes.guard';
import { PrivateLayoutComponent } from './site/private-layout/private-layout.component';
import { PublicLayoutComponent } from './site/public-layout/public-layout.component';
import { UserListingComponent } from './site/user-listing/user-listing.component';
import { HostListingComponent } from './site/host-listing/host-listing.component';
import { DisputeListingComponent } from './site/dispute-listing/dispute-listing.component';

const routes: Routes =[
  {
    path: '', redirectTo: '/loginadmin', pathMatch: 'full'
  
  },
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      {path:'loginadmin' , component : LoginModalComponent}
    ]
  },
  {
    path: '',
    component: PrivateLayoutComponent,
    canActivate: [RoutesGuard],
    children: [
      { path: 'home', component: HomeDashboardComponent }, 
      { path: 'users', component: UserListingComponent }, 
      { path: 'host', component: HostListingComponent }, 
      { path: 'dispute', component: DisputeListingComponent }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
