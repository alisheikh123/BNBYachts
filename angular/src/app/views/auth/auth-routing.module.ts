import { ResetPasswordComponent } from './../auth/components/reset-password/reset-password.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "reset-password/:id", component: ResetPasswordComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})  
export class AuthRoutingModule { }
