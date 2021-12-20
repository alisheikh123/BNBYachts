import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from 'src/app/app.component';
import { PaymentsService } from 'src/app/core/Payment/payments.service';
import { YachtSearchDataService } from 'src/app/core/yacht-search/yacht-search-data.service';
import { YachtSearchService } from 'src/app/core/yacht-search/yacht-search.service';
import { environment } from 'src/environments/environment';
import { UserPaymentMethodsComponent } from '../user-payment-methods/user-payment-methods.component';
import { BookingConfirmedModalComponent } from './booking-confirmed-modal/booking-confirmed-modal.component';

@Component({
  selector: 'app-charter-booking-payment',
  templateUrl: './charter-booking-payment.component.html',
  styleUrls: ['./charter-booking-payment.component.scss']
})
export class CharterBookingPaymentComponent implements OnInit {

  charterId: number;
  boatDetails: any;
  assetsUrl = environment.S3BUCKET_URL + '/boatGallery/';
  charterFilterDetails = {
    departureDate: new Date(),
    adults: 0,
    childrens: 0
  };
  isBookingConfirmed: boolean = false;
  isPaymentFailed: boolean = false;
  bookingId: any;
  charterDetails: any;
  @ViewChild(UserPaymentMethodsComponent) paymentMethodsComponent: UserPaymentMethodsComponent;

  constructor(public app: AppComponent,
    private activatedRoute: ActivatedRoute, private boatService: YachtSearchService,
    private yachtParamService: YachtSearchDataService, private paymentService: PaymentsService, private modal: NgbModal) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(res => {
      this.charterId = Number(res['id']);
      this.bookingId = Number(res['bookingid']);
    });
    this.charterFilterDetails = this.yachtParamService.getFilters();
    this.loadCharterDetails();
  }

  loadCharterDetails() {
    this.boatService.charterDetailsById(this.charterId).subscribe((res: any) => {
      this.charterDetails = res?.charterDetails;
    })
  }

  async confirmBooking() {
    var amount = this.charterDetails?.isFullBoatCharges ? this.charterDetails?.charterFee : this.charterDetails?.charterFee * (this.charterFilterDetails.adults + this.charterFilterDetails.childrens);
    var token = (this.paymentMethodsComponent.addCardDetails ? await this.paymentMethodsComponent.createToken() : null);
    let model = {
      paymentId: this.paymentMethodsComponent.paymentMethodId,
      bookingId: this.bookingId,
      amount: amount + this.charterDetails?.boat.taxFee + 20,
      IsSaveNewPaymentMethod: this.paymentMethodsComponent.isSaveNewPayment,
      token: token,
      description: this.charterDetails?.boat.name + ' Charter Booking Charges from ' + this.charterFilterDetails.departureDate
    };
    this.paymentService.pay(model).subscribe(res => {
      if (res) {
        this.modal.open(BookingConfirmedModalComponent, { windowClass: 'custom-modal custom-small-modal', centered: true })
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
