import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentsRoutingModule { }
