import { ResetPasswordComponent } from './../auth/components/reset-password/reset-password.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/main-home/home.component';

const routes: Routes = [
  {
    path: "", component: HomeComponent
  }
  // {
  //   path: "/resetPassword", component: ResetPasswordComponent
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
