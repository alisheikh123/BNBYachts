import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RoutesGuard } from './routes.guard';

export const routes: Routes = [
  // { path: 'login',component: LoginComponent  },
  // {
  //   path: '',
  //   component : AuthComponent,
  //   children :[
  //     {
  //       path:'login',
  //       component: LoginComponent
  //     },
  //     {
  //       path:'setpassword',
  //       component: SetPasswordComponent
  //     }
  //   ]
  // },
  {
    path: 'pages',
    canActivate: [RoutesGuard],
    loadChildren: () => import('./pages/pages.module')
      .then(m => m.PagesModule),
  },
  // { path: '', redirectTo: 'auth', pathMatch: 'full' },
  // { path: '**', redirectTo: 'pages' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
