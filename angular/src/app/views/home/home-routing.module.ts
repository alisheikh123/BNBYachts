import { ResetPasswordComponent } from './../auth/components/reset-password/reset-password.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/main-home/home.component';
import { HostDashboardComponent } from './components/host-dashboard/host-dashboard.component';
import { CharterQuoteRequestComponent } from './components/QuoteRequest/charter-quote-request/charter-quote-request.component';
import { SwitchRoleComponent } from './components/switch-role/switch-role.component';

const routes: Routes = [
  {
    path: "", component: HomeComponent
  },
  {
    path: "switchapp", component: SwitchRoleComponent
  },
  {
    path: "switchapp/:switchtype", component: SwitchRoleComponent
  },
  {
    path: "host-dashboard", component: HostDashboardComponent
  },
  {
    path: "quote/:boatId", component: CharterQuoteRequestComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
