import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BillingComponent } from './billing/billing.component';
import { BoatelBookingPaymentComponent } from './boatel-booking-payment/boatel-booking-payment.component';
import { CharterBookingPaymentComponent } from './charter-booking-payment/charter-booking-payment.component';
import { ContractPaymentComponent } from './contract-payment/contract-payment.component';
import { EventBookingPaymentComponent } from './event-booking-payment/event-booking-payment.component';
const routes: Routes = [
 
  {
    path: "boatel-payments/:id/:bookingid", component:BoatelBookingPaymentComponent
  },
  {
    path: "charter-payments/:id/:bookingid", component:CharterBookingPaymentComponent
  },
  {
    path: "event-payments/:id/:bookingid", component:EventBookingPaymentComponent
  }
  ,  {
    path: "contract-payments/:contractId", component:ContractPaymentComponent
  },
  {
    path: "billing", component:BillingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentsRoutingModule { }
