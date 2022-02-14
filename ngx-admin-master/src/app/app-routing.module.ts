import { AppComponent } from './app.component';
import { LoginModalComponent } from './pages/auth/login-modal/login-modal.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RoutesGuard } from './routes.guard';

export const routes: Routes = [
  // { path: '',component: AppComponent  },
  {
    path: 'pages',
    canActivate: [RoutesGuard],
    loadChildren: () => import('./pages/pages.module')
      .then(m => m.PagesModule),
  },
  // { path: '', redirectTo: 'pages', pathMatch: 'full' },
  // { path: '**', redirectTo: 'pages' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
