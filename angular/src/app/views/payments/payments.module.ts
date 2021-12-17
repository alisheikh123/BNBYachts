import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxStripeModule } from 'ngx-stripe';
import { ReservationService } from 'src/app/core/host/reservation.service';
import { YachtSearchService } from 'src/app/core/yacht-search/yacht-search.service';
import { SharedPipesModule } from 'src/app/shared/pipes/shared-pipes.module';
import { environment } from 'src/environments/environment';
import { BoatelBookingPaymentComponent } from './boatel-booking-payment/boatel-booking-payment.component';
import { CharterBookingPaymentComponent } from './charter-booking-payment/charter-booking-payment.component';
import { EventBookingPaymentComponent } from './event-booking-payment/event-booking-payment.component';
import { PaymentsRoutingModule } from './payments-routing.module';
import { UserPaymentMethodsComponent } from './user-payment-methods/user-payment-methods.component';
import { BookingConfirmedModalComponent } from './charter-booking-payment/booking-confirmed-modal/booking-confirmed-modal.component';



@NgModule({
  declarations: [
    BoatelBookingPaymentComponent,
    CharterBookingPaymentComponent,
    EventBookingPaymentComponent,
    UserPaymentMethodsComponent,
    BookingConfirmedModalComponent
  ],
  imports: [
    PaymentsRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    GoogleMapsModule,
    CommonModule,
    SharedPipesModule,
    NgxStripeModule.forRoot(environment.stripeKey)
  ],
  providers: [YachtSearchService,ReservationService]
})
export class PaymentsModule { }
