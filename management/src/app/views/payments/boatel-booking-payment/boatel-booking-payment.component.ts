import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { AppComponent } from 'src/app/app.component';
import { PaymentsService } from 'src/app/core/Payment/payments.service';
import { YachtSearchDataService } from 'src/app/core/yacht-search/yacht-search-data.service';
import { YachtSearchService } from 'src/app/core/yacht-search/yacht-search.service';
import { environment } from 'src/environments/environment';
import { UserPaymentMethodsComponent } from '../user-payment-methods/user-payment-methods.component';

@Component({
  selector: 'app-boatel-booking-payment',
  templateUrl: './boatel-booking-payment.component.html',
  styleUrls: ['./boatel-booking-payment.component.scss']
})
export class BoatelBookingPaymentComponent implements OnInit {

  boatId: number;
  boatDetails: any;
  assetsUrl = environment.S3BUCKET_URL + '/boatGallery/';
  boatFilterDetails = {
    checkinDate: '',
    checkoutDate: '',
    adults: 0,
    childrens: 0
  };
  booking = {
    amount :0,
    days:0
  };
  isBookingConfirmed: boolean = false;
  isPaymentFailed: boolean = false;
  bookingId: any;
  @ViewChild(UserPaymentMethodsComponent) paymentMethodsComponent: UserPaymentMethodsComponent;
  cancellationPolicyString: any = "Short description about the host Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.";  
  readAll: boolean = false;

  constructor(public app: AppComponent,
    private cdr: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute, private boatService: YachtSearchService,
    private yachtParamService: YachtSearchDataService, private paymentService: PaymentsService,private router:Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(res => {
      this.boatId = Number(res['id']);
      this.bookingId = Number(res['bookingid']);
    });
    this.boatFilterDetails = this.yachtParamService.getFilters();
    this.loadBoatDetails();    
  }
  disablePayment(){
    if(this.paymentMethodsComponent && (this.paymentMethodsComponent.paymentMethodId == null && this.paymentMethodsComponent.cardError == true)){
      return true;
    }
    return false;
  }

  loadBoatDetails() {
    this.boatService.boatDetailsById(this.boatId).subscribe((res: any) => {
      this.boatDetails = res;
      this.calculatePricing();
    })
  }

  calculatePricing() {
    let price = 0;
    if (this.boatFilterDetails.checkinDate != null && this.boatFilterDetails.checkoutDate != null && this.boatDetails != null) {
      var checkinDate = moment(this.boatFilterDetails.checkinDate).format("DD-MM-YYYY");
      var checkoutDate = moment(this.boatFilterDetails.checkoutDate).format("DD-MM-YYYY");
      for (var i = checkinDate; i <= checkoutDate; i = moment(i, "DD-MM-YYYY").add(1, 'days').format("DD-MM-YYYY")) {
        let findCalendar = this.boatDetails.boatCalendars.find((element: any) =>
          moment(element.fromDate).format("DD-MM-YYYY") == i &&
          moment(element.toDate).format("DD-MM-YYYY") == i && element.isAvailable
        );
        if (findCalendar) {
          price = price + findCalendar.amount;
        }
        else {
          price = price + this.boatDetails.perDayCharges
        }
      }
      this.booking.days = moment(checkoutDate,"DD-MM-YYYY").diff(moment(checkinDate,"DD-MM-YYYY"),'days')+1;
    }
    this.booking.amount = price;
  }
  
  ngAfterViewInit() {
    this.disablePayment();
    this.cdr.detectChanges();
  }

  async confirmBooking() {
    var amount = this.booking.amount;
    var token = (this.paymentMethodsComponent.addCardDetails ? await this.paymentMethodsComponent.createToken() : null);
    let model = {
      paymentId: this.paymentMethodsComponent.paymentMethodId,
      bookingId: this.bookingId,
      amount: amount + this.boatDetails.taxFee + 20,
      IsSaveNewPaymentMethod: this.paymentMethodsComponent.isSaveNewPayment,
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
