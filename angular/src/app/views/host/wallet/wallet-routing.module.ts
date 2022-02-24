import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WalletSettingComponent } from './wallet-setting/wallet-setting.component';

const routes: Routes = [
  {
    path: "wallet", component:WalletSettingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WalletRoutingModule { }
