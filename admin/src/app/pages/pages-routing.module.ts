import { HomeDashboardComponent } from './home-dashboard/home-dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: HomeDashboardComponent,
    },
    {
      path: 'auth',
      loadChildren: () => import('./auth/auth.module')
        .then(m => m.AuthAppModule),
    },
    {
      path: 'user',
      loadChildren: () => import('./user/user.module')
        .then(m => m.UserModule),
    },
    {
      path: 'host',
      loadChildren: () => import('./host/host.module')
        .then(m => m.HostModule),
    },
    {
      path: 'dispute',
      loadChildren: () => import('./dispute/dispute.module')
        .then(m => m.DisputeModule),
    },
    {
      path: 'faqs',
      loadChildren: () => import('./faqs/faqs.module')
        .then(m => m.FaqsModule),
    },
    {
      path: '',
      redirectTo: 'pages',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
