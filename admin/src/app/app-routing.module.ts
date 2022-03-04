import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RoutesGuard } from './routes.guard';
import { LoginComponent } from './pages/auth/login/login.component';
import { SetPasswordComponent } from './pages/auth/set-password/set-password.component';
import { AuthComponent } from './pages/auth/auth.component';

export const routes: Routes = [
  {
    path: '',
    component : AuthComponent,
    children :[
      {
        path:'login',
        component: LoginComponent
      },
      {
        path:'setpassword',
        component: SetPasswordComponent
      }
    ]
  },
  {
    path: 'pages',
    canActivate: [RoutesGuard],
    loadChildren: () => import('./pages/pages.module')
      .then(m => m.PagesModule),
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
