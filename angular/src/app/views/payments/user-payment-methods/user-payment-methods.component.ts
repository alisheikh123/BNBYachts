import { Component, OnInit, ViewChild } from '@angular/core';
import { CreateTokenCardData, StripeCardElementOptions, StripeElementsOptions } from '@stripe/stripe-js';
import { StripeCardComponent, StripeService } from 'ngx-stripe';
import { PaymentsService } from 'src/app/core/Payment/payments.service';

@Component({
  selector: 'app-user-payment-methods',
  templateUrl: './user-payment-methods.component.html',
  styleUrls: ['./user-payment-methods.component.scss']
})
export class UserPaymentMethodsComponent implements OnInit {

  userPaymentMethods:any;
  paymentMethodId:string;
  cardErrors: string;
  /////Stripe Region
  addCardDetails: boolean = false;
  stripeModel = {
    name: ""
  };
  isBookingConfirmed: boolean = false;
  isPaymentFailed: boolean = false;
  isSaveNewPayment: boolean = false;
  @ViewChild(StripeCardComponent) card!: StripeCardComponent;
  cardOptions: StripeCardElementOptions = {
    hidePostalCode: true,
    style: {
      base: {
        color: '#303238',
        fontSize: '16px',
        fontFamily: '"Open Sans", sans-serif',
        fontSmoothing: 'antialiased',
        '::placeholder': {
          color: '#CFD7DF',
        },
      },
      invalid: {
        color: '#e5424d',
        ':focus': {
          color: '#303238',
        },
      }
    }
  };
  elementsOptions: StripeElementsOptions = {
    locale: 'en'
  };
  constructor(private service:PaymentsService,private stripeService:StripeService) { }

  ngOnInit(): void {
    this.loadUserPaymentsMethods();
  }
  loadUserPaymentsMethods() {
    this.service.getUserPaymentMethods().subscribe(res => {
      this.userPaymentMethods = res;
      this.paymentMethodId = (this.userPaymentMethods?.length > 0 ? this.userPaymentMethods[0].id : '');
    });
  }

  createToken() {
    return new Promise(resolve => {
      const data: CreateTokenCardData = {
        name: this.stripeModel.name
      };
      this.stripeService
        .createToken(this.card.element, data)
        .subscribe((result) => {
          if (result.token) {
            // Use the token
            resolve(result.token.id);
          } else if (result.error) {
            this.cardErrors = result.error.message?.toString() || "";
          }
        });
    });
  }
}
