import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  isBookingConfirmed: boolean = false;
  isPaymentFailed: boolean = false;
  bookingId: any;
  @ViewChild(UserPaymentMethodsComponent) paymentMethodsComponent: UserPaymentMethodsComponent;

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
    })
  }

  calculateDays() {
    if (this.boatFilterDetails.checkinDate != '' && this.boatFilterDetails.checkoutDate != '') {
      var date1 = new Date(this.boatFilterDetails.checkinDate);
      var date2 = new Date(this.boatFilterDetails.checkoutDate);
      var Time = date2.getTime() - date1.getTime();
      var Days = Math.floor(Time / (1000 * 3600 * 24));
      return Days < 0 ? 0 : Days + 1;
    }
    else {
      return 0;
    }
  }
  ngAfterViewInit() {
    this.disablePayment();
    this.cdr.detectChanges();
  }

  async confirmBooking() {
    var amount = this.calculateDays() * this.boatDetails.perDayCharges;
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
        this.router.navigate(["/boat-listing/all-reservations"]);
      }
      this.router.navigate(["/boat-listing/all-reservations"]);
    })
  }

  retryPayment() {
    this.isBookingConfirmed = false;
    this.isPaymentFailed = false;
  }
}
