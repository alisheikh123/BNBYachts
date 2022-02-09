import { LoginModalComponent } from './site/auth/login-modal/login-modal.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeDashboardComponent } from './reports/home-dashboard/home-dashboard.component';
import { RoutesGuard } from './routes.guard';
import { PrivateLayoutComponent } from './site/private-layout/private-layout.component';
import { PublicLayoutComponent } from './site/public-layout/public-layout.component';

const routes: Routes =[
  {
    path: '', redirectTo: '/loginadmin', pathMatch: 'full'
  
  },
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      {path:'loginadmin' , component : LoginModalComponent}
      // {
      //   path: 'loginadmin',
      //   loadChildren: () => import('./site/auth/auth.module').then(m => m.AuthAppModule)
      // },
    ]
  },
  {
    path: '',
    component: PrivateLayoutComponent,
    canActivate: [RoutesGuard],
    children: [
      { path: 'home', component: HomeDashboardComponent }, 
      {
        path: 'users',
        loadChildren: () => import('./site/user/user.module').then(m => m.UserModule)
      },
      {
        path: 'host',
        loadChildren: () => import('./site/host/host.module').then(m => m.HostModule)
      },
      {
        path: 'dispute',
        loadChildren: () => import('./site/dispute/dispute.module').then(m => m.DisputeModule)
      },
    ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
