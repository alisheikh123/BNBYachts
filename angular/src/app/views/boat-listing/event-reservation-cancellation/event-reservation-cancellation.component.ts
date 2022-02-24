import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BookingService } from 'src/app/core/Booking/booking.service';
import { AddReviewModalComponent } from '../../common/add-review-modal/add-review-modal.component';
import { ToastrService } from 'ngx-toastr';
import { BookingStatus, BookingType } from 'src/app/shared/enums/booking.constants';
import * as moment from 'moment';
import { UserRoles } from 'src/app/shared/enums/user-roles';
import { EventService } from 'src/app/core/Event/event.service';

@Component({
  selector: 'app-event-reservation-cancellation',
  templateUrl: './event-reservation-cancellation.component.html',
  styleUrls: ['./event-reservation-cancellation.component.scss']
})
export class EventReservationCancellationComponent implements OnInit {
  eventCancellationObject =
  {
    eventId: 0,
    currentDate: '',
    eventBookingId: 0,
    eventDate: ''
  }
  eventCancellationReason=
  {
    reasonValue:'',
    eventBookingId:0,
    bookingType:'',
    bookingStatus:'',
    refundableAmount:0,
    totalAmount:0,
    userId:'',
    eventBookingStatus: 0
  }
eventDetail: any;
eventBookingDetail:any;
isCancellationModal: boolean = false;
currentDateHours: any;
totalHours: any;
isHost: boolean;
isPosted: boolean;
isChanged: boolean;
filters = {
  USER_ROLES: UserRoles,
  BOOKING_STATUS:BookingStatus,
  BOOKING_TYPE:BookingType
};
constructor(
  private service: BookingService,
  private modal: NgbModal,
  public activatedRoute: ActivatedRoute,
  private route: Router,
  private eventService: EventService,
  private toaster: ToastrService
) { }
@ViewChild('policyModal') policyModal: TemplateRef<any>;
  @ViewChild('bookingstatus') bookingtemplate: TemplateRef<any>;
  @ViewChild('bookingcancelled') cancelledRef: TemplateRef<any>;
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((res) => {
      this.eventCancellationObject.eventId = res['eventId'].toString();
      this.eventCancellationObject.eventBookingId = res['id'].toString();
    });

    let userRole = localStorage.getItem('userRole');
    userRole == this.filters.USER_ROLES.host ? (this.isHost = true) : (this.isHost = false);

    this.eventService.getEventById(this.eventCancellationObject.eventId).subscribe((res: any) => {
      this.eventDetail = res.data;
      this.service.getEventBookingDetailById(this.eventCancellationObject.eventBookingId).subscribe((eventBookingDetail: any) => {
        this.eventBookingDetail = eventBookingDetail.data;
      });
      this.service.getBoatInfo(this.eventDetail.boatId).subscribe((boatdetail: any) => {
        this.eventDetail.boatDetail = boatdetail;
        this.eventCancellationObject.currentDate = moment().format('YYYY-MM-DD');
        let eventStartDateTime = moment(this.eventBookingDetail?.eventDate).format('YYYY-MM-DD')+' '+(moment(this.eventDetail?.startDateTime).format('hh:mm:a'));
        let remaingHours = moment.duration(moment(eventStartDateTime).diff(moment().format('YYYY-MM-DD hh:mm:a'))).asHours();
        let reservationFeeCalculation = 0;
        if (this.eventBookingDetail.bookingStatus == 0) {
          if (remaingHours > 72) {
              this.eventDetail.deductedAmount = 0;
              reservationFeeCalculation =
              this.eventDetail?.amountPerPerson * this.eventBookingDetail?.noOfGuests + 20 + this.eventDetail?.boatDetail?.taxFee;
              this.eventDetail.refundableAmount = this.eventDetail.deductedAmount + reservationFeeCalculation;

          }
          if (remaingHours == 72 || (remaingHours < 72 && remaingHours >= 24))
          {
              this.eventDetail.deductedAmount = ((this.eventDetail?.amountPerPerson * this.eventBookingDetail?.noOfGuests + 20 + this.eventDetail?.boatDetail?.taxFee) * 50) / 100;
              reservationFeeCalculation = ((this.eventDetail?.amountPerPerson * this.eventBookingDetail?.noOfGuests + 20 + this.eventDetail?.boatDetail?.taxFee) * 50) / 100;
              this.eventDetail.refundableAmount =  reservationFeeCalculation;


          }
          if (remaingHours < 24)
          {
              this.eventDetail.deductedAmount = this.eventDetail?.amountPerPerson * this.eventBookingDetail?.noOfGuests + 20 + this.eventDetail?.boatDetail?.taxFee;
              this.eventDetail.refundableAmount = 0;

          }

      }
        if (this.isHost) {
          this.eventDetail.deductedAmount = 0;
          this.eventDetail.refundableAmount =this.eventDetail?.amountPerPerson * this.eventBookingDetail?.noOfGuests + 20 + this.eventDetail?.boatDetail?.taxFee;
        }
      });
    });

    this.isReviewPosted();
  }
  goBack() {
    this.modal.dismissAll();
    this.route.navigate(['/boat-listing/all-reservations']);
  }
  cancelpopup() {
    this.modal.dismissAll();
  }

  openModal(template: TemplateRef<any>, data: any) {
    this.eventCancellationReason.bookingStatus = data.bookingDetail?.bookingStatus;
    this.eventCancellationReason.eventBookingId = data.bookingDetail?.charterId;
    this.eventCancellationReason.refundableAmount = data.refundableAmount;
    this.eventCancellationReason.totalAmount = data.deductedAmount + data.refundableAmount;
    this.eventDetail.BookingType = this.filters.BOOKING_TYPE.Charters;
    this.modal.open(template, { centered: true });
  }
  confirmCancel() {
    let charterCancellationModel = {
      bookingId: Number(this.eventCancellationObject.eventBookingId),
      bookingType: this.filters.BOOKING_TYPE.Events,
      reason: this.eventCancellationReason.reasonValue,
      userId: "",
      isNotificationSent: true,
      refundAmount: this.eventCancellationReason.refundableAmount.toString(),
      totalAmount: this.eventCancellationReason.totalAmount.toString(),
      bookingStatus: this.filters.BOOKING_STATUS.Cancel
    };
    this.service.saveEventBookingCancellation(charterCancellationModel)
      .subscribe((res: any) => {
        this.service.getRefundable(charterCancellationModel.bookingId,Math.floor(this.eventCancellationReason.refundableAmount)).subscribe((isRefundablePay:any) =>
        {

        });
        this.modal.dismissAll();
        this.modal.open(this.cancelledRef);
      });
  }

  addReview(boatId: number) {
    this.modal
      .open(AddReviewModalComponent, {
        windowClass: 'custom-modal custom-small-modal',
        centered: true,
      })
      .componentInstance.onSave.subscribe((res: any) => {
        let review = {
          revieweeID: boatId,
          bookingId: this.eventCancellationObject.eventId,
          reviewDescription: res.reviewText,
          ratings: res.ratingStars,
        };
        this.service.addReview(review).subscribe((res) => {
          if (res) {
            this.modal.dismissAll();
            this.toaster.success('Review Added Successfully', 'Review');
            this.isPosted = true;
            // this.listReviewComponent.getReviews();
          }
        });
      });
  }
  isReviewPosted() {
    this.service.isReviewPosted(this.eventCancellationObject.eventId).subscribe((res: any) => {
      this.isPosted = res;
    });
  }
  isBookingPassed(): boolean {
    let parsedDate = Date.parse(this.eventCancellationObject.eventDate);
    let today = Date.parse(new Date().toString());
    return today > parsedDate ? true : false;
  }
}