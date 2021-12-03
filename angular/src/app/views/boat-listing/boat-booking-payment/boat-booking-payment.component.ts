import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CreateTokenCardData, StripeCardElementOptions, StripeElementsOptions } from '@stripe/stripe-js';
import { StripeCardComponent, StripeService } from 'ngx-stripe';
import { AppComponent } from 'src/app/app.component';
import { PaymentsService } from 'src/app/core/Payment/payments.service';
import { YachtSearchDataService } from 'src/app/core/yacht-search/yacht-search-data.service';
import { YachtSearchService } from 'src/app/core/yacht-search/yacht-search.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-boat-booking-payment',
  templateUrl: './boat-booking-payment.component.html',
  styleUrls: ['./boat-booking-payment.component.scss']
})
export class BoatBookingPaymentComponent implements OnInit {
  boatId: number;
  boatDetails: any;
  //assetsUrl = environment.BOAT_API_URL + '/boatgallery/';
  assetsUrl = environment.S3BUCKET_URL + '/boatGallery/';
  boatFilterDetails = {
    checkinDate: '',
    checkoutDate: '',
    adults: 0,
    childrens: 0
  };
  cardErrors: string;
  /////Stripe Region
  addCardDetails: boolean = false;
  userPaymentMethods: any;
  stripeModel = {
    name: ""
  };
  isBookingConfirmed: boolean = false;
  isPaymentFailed: boolean = false;
  isSaveNewPayment: boolean = false;
  paymentMethodId: string;
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
  bookingId: any;
  constructor(public app: AppComponent, private stripeService: StripeService, private activatedRoute: ActivatedRoute, private boatService: YachtSearchService, private yachtParamService: YachtSearchDataService, private paymentService: PaymentsService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(res => {
      this.boatId = Number(res['id']);
      this.bookingId = Number(res['bookingid']);
    });
    this.boatFilterDetails = this.yachtParamService.getFilters();
    this.loadBoatDetails();
  }

  loadBoatDetails() {
    this.boatService.boatDetailsById(this.boatId).subscribe((res: any) => {
      this.boatDetails = res;
      this.loadUserPaymentsMethods();
    })
  }

  loadUserPaymentsMethods() {
    this.paymentService.getUserPaymentMethods().subscribe(res => {
      this.userPaymentMethods = res;
      this.paymentMethodId = (this.userPaymentMethods?.length > 0 ? this.userPaymentMethods[0].id : '');
    });
  }
  calculateDays() {
    if (this.boatFilterDetails.checkinDate != '' && this.boatFilterDetails.checkoutDate != '') {
      var date1 = new Date(this.boatFilterDetails.checkinDate);
      var date2 = new Date(this.boatFilterDetails.checkoutDate);
      var Time = date2.getTime() - date1.getTime();
      var Days = Time / (1000 * 3600 * 24);
      return Days < 0 ? 0 : Days + 1;
    }
    else {
      return 0;
    }
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

  async confirmBooking() {
    var amount = this.calculateDays() * this.boatDetails.perDayCharges;
    var token = (this.addCardDetails ? await this.createToken() : null);
    let model = {
      paymentId: this.paymentMethodId,
      bookingId: this.bookingId,
      amount: amount + this.boatDetails.taxFee + 20,
      IsSaveNewPaymentMethod: this.isSaveNewPayment,
      token: token,
      description: this.boatDetails.name + ' Booking Charges from ' + this.boatFilterDetails.checkinDate + " to " + this.boatFilterDetails.checkoutDate
    };
    this.paymentService.pay(model).subscribe(res => {
      if (res) {
        this.isBookingConfirmed = true;
        this.isPaymentFailed = false;
      }
      else {
        this.isBookingConfirmed = false;
        this.isPaymentFailed = true;
      }
    })
  }
  retryPayment() {
    this.isBookingConfirmed = false;
    this.isPaymentFailed = false;
  }
}
