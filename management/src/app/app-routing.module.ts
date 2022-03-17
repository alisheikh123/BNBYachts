import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/auth/components/login/login.component';

const routes: Routes = [
  {
    path: "", component: LoginComponent
  },
  {
    path: "login", component: LoginComponent
  },
  {
    path: 'notauthorize',
    loadChildren: () => import('./views/not-authorize/not-authorize.module').then(m => m.NotAuthorizeModule)
  },
  {
    path: 'app',
    loadChildren: () => import('./views/management/management.module').then(m => m.ManagementModule)
  },
  { path: '**', redirectTo: 'app/management' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      anchorScrolling: 'enabled',
      onSameUrlNavigation: 'reload',
      scrollPositionRestoration: 'enabled',
      enableTracing: false
    })
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
