import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { AppComponent } from 'src/app/app.component';
import { PaymentsService } from 'src/app/core/Payment/payments.service';
import { YachtSearchDataService } from 'src/app/core/yacht-search/yacht-search-data.service';
import { YachtSearchService } from 'src/app/core/yacht-search/yacht-search.service';
import { environment } from 'src/environments/environment';
import { BookingConfirmedModalComponent } from '../charter-booking-payment/booking-confirmed-modal/booking-confirmed-modal.component';
import { UserPaymentMethodsComponent } from '../user-payment-methods/user-payment-methods.component';

@Component({
  selector: 'app-event-booking-payment',
  templateUrl: './event-booking-payment.component.html',
  styleUrls: ['./event-booking-payment.component.scss']
})
export class EventBookingPaymentComponent implements OnInit {

  eventId: number;
  assetsUrl = environment.S3BUCKET_URL + '/boatGallery/';
  eventFilterDetails = {
    eventDate: new Date(),
    adults: 0,
    childrens: 0
  };
  isBookingConfirmed: boolean = false;
  isPaymentFailed: boolean = false;
  bookingId: any;
  eventDetails: any;
  @ViewChild(UserPaymentMethodsComponent) paymentMethodsComponent: UserPaymentMethodsComponent;
  cancellationPolicyString = "Short description about the host Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.";
  readAll = false;
  booking = {
    amount :0
  };

  constructor(public app: AppComponent,
    private cdr: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute, private boatService: YachtSearchService,
    private yachtParamService: YachtSearchDataService, private paymentService: PaymentsService, private modal: NgbModal) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(res => {
      this.eventId = Number(res['id']);
      this.bookingId = Number(res['bookingid']);
    });
    this.eventFilterDetails = this.yachtParamService.getFilters();
    this.loadEventDetails();
  }

  loadEventDetails() {
    this.boatService.eventDetailsById(this.eventId).subscribe((res: any) => {
      this.eventDetails = res?.eventDetails;
      this.calculatePricing();
    })
  }

  async confirmBooking() {
    var amount =this.booking.amount * (this.eventFilterDetails.adults + this.eventFilterDetails.childrens);
    var token = (this.paymentMethodsComponent.addCardDetails ? await this.paymentMethodsComponent.createToken() : null);
    let model = {
      paymentId: this.paymentMethodsComponent.paymentMethodId,
      bookingId: this.bookingId,
      amount: amount + this.eventDetails?.boat.taxFee + 20,
      IsSaveNewPaymentMethod: this.paymentMethodsComponent.isSaveNewPayment,
      token: token,
      description: this.eventDetails?.boat.name + ' Event  Booking Charges from ' + this.eventFilterDetails.eventDate
    };
    this.paymentService.pay(model).subscribe(res => {
      if (res) {
        this.modal.open(BookingConfirmedModalComponent, { windowClass: 'custom-modal custom-small-modal', centered: true,backdrop:'static' })
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
  disablePayment(){
    if(this.paymentMethodsComponent && (this.paymentMethodsComponent.paymentMethodId == null && this.paymentMethodsComponent.cardError == true)){
      return true;
    }
    return false;
  }

  ngAfterViewInit() {
    this.disablePayment();
    this.cdr.detectChanges();
  }
  calculatePricing() {
    if ((this.eventFilterDetails?.adults + this.eventFilterDetails?.childrens) > 0  && this.eventDetails != null) {
        let findCalendar = this.eventDetails?.boat.boatCalendars.find((element: any) =>
          moment(element.fromDate).format("DD-MM-YYYY") == moment(this.eventDetails?.startDateTime).format("DD-MM-YYYY") &&
          moment(element.toDate).format("DD-MM-YYYY") == moment(this.eventDetails?.startDateTime).format("DD-MM-YYYY")
           && element.isAvailable
        );
        if (findCalendar) {
          this.booking.amount = findCalendar.amount;
        }
        else {
          this.booking.amount = this.eventDetails?.amountPerPerson;
        }
      }
    }
}
