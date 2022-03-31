import { SettingTabComponent } from './setting-tab.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServiceFeeComponent } from './service-fee/service-fee.component';
import { NewsletterSubscriptionComponent } from './newsletter-subscription/newsletter-subscription.component';
import { SubscribeUsersComponent } from './subscribe-users/subscribe-users.component';

const routes: Routes = [
  {
    path: '',
    component: SettingTabComponent,
    children: [
      {
        path: 'servicesFee',
        component: ServiceFeeComponent,
      },
      {
        path: 'newsletter',
        component: NewsletterSubscriptionComponent,
      },
      {
        path : 'subscribeusers',
        component : SubscribeUsersComponent
      }
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
  ServiceFeeComponent,
  NewsletterSubscriptionComponent,
  SubscribeUsersComponent
];
