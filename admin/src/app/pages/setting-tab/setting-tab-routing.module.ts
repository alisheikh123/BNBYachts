import { SettingTabComponent } from './setting-tab.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServiceFeeComponent } from './service-fee/service-fee.component';

const routes: Routes = [
  {
    path: '',
    component: SettingTabComponent,
    children: [
      {
        path: 'servicesFee',
        component: ServiceFeeComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingTabRoutingModule { }
export const routedComponents = [
  SettingTabComponent,
  ServiceFeeComponent
];
