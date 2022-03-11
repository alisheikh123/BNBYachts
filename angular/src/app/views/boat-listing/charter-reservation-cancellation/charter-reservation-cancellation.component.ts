import { FormBuilder, FormControlName, FormGroup } from '@angular/forms';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BookingService } from 'src/app/core/Booking/booking.service';
import { utils } from 'src/app/shared/utility/utils';
import { AddReviewModalComponent } from '../../common/add-review-modal/add-review-modal.component';
import { ToastrService } from 'ngx-toastr';
import { ListReviewsComponent } from '../../common/list-reviews/list-reviews.component';
import { BookingStatus, BookingType } from 'src/app/shared/enums/booking.constants';
import { BookingListingService } from 'src/app/core/Booking/booking-listing.service';
import * as moment from 'moment';
import { CharterService } from 'src/app/core/Charter/charter.service';
import { UserRoles } from 'src/app/shared/enums/user-roles';

@Component({
  selector: 'app-charter-reservation-cancellation',
  templateUrl: './charter-reservation-cancellation.component.html',
  styleUrls: ['./charter-reservation-cancellation.component.scss']
})
export class CharterReservationCancellationComponent implements OnInit {
  charterCancellationObject =
    {
      charterId: 0,
      currentDate: '',
      bookingId: 0,
      departureToDate: ''
    }
    charterCancellationReason=
    {
      reasonValue:'',
      charterBookingId:0,
      bookingType:'',
      bookingStatus:'',
      refundableAmount:0,
      totalAmount:0,
      userId:'',
      charterBookingStatus: 0
    }
  charterBookingDetail: any;
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
    private fb: FormBuilder,
    private modal: NgbModal,
    public activatedRoute: ActivatedRoute,
    private route: Router,
    private charterService: CharterService,
    private charterBookingService: BookingListingService,
    private toaster: ToastrService
  ) { }
  @ViewChild('policyModal') policyModal: TemplateRef<any>;
  @ViewChild('bookingstatus') bookingtemplate: TemplateRef<any>;
  @ViewChild('bookingcancelled') cancelledRef: TemplateRef<any>;
  @ViewChild(ListReviewsComponent) listReviewComponent: ListReviewsComponent;
  ngOnInit(): void {

    this.activatedRoute.params.subscribe((res) => {
      this.charterCancellationObject.charterId = res['bookingId'].toString();
      this.charterCancellationObject.bookingId = res['id'].toString();
    });

    let userRole = localStorage.getItem('userRole');
    userRole == this.filters.USER_ROLES.host ? (this.isHost = true) : (this.isHost = false);
    this.charterService.getCharterDetailById(this.charterCancellationObject.charterId).subscribe((res: any) => {
      this.charterBookingDetail = res.data;
      this.charterBookingService.getCharterBookingDetailById(this.charterCancellationObject.bookingId).subscribe((bookingDetail: any) => {
        this.charterBookingDetail.bookingDetail = bookingDetail;
      });
      this.service.getBoatInfo(this.charterBookingDetail.boatId).subscribe((boatdetail: any) => {
        this.charterBookingDetail.boatDetail = boatdetail;
        this.charterCancellationObject.currentDate = moment().format('YYYY-MM-DD');
        let formattedDepartureFromDate = moment(this.charterBookingDetail?.departureFromDate).format('YYYY-MM-DD hh:mm:ss a');
        let formattedDepartureToDate = moment(this.charterBookingDetail?.departureToDate).format('YYYY-MM-DD hh:mm:ss a');
        let remaingHours = moment.duration(moment(formattedDepartureFromDate).diff(moment())).asHours();
        let totalDays = Math.round(moment.duration(moment(formattedDepartureToDate).diff(formattedDepartureFromDate)).asDays());
        this.charterBookingDetail.TotalDays = totalDays;
        let reservationFeeCalculation = 0;

        if (this.charterBookingDetail.bookingStatus == 0 || this.charterBookingDetail.bookingStatus == 1) {
          this.charterBookingDetail.deductedAmount = 0;
          reservationFeeCalculation = this.charterBookingDetail?.charterFee * totalDays + 20 + this.charterBookingDetail.boatDetail.taxFee;
          this.charterBookingDetail.refundableAmount = this.charterBookingDetail.deductedAmount + reservationFeeCalculation;

        }
        else {
          if (remaingHours > 72) {
            if(this.charterBookingDetail?.isFullBoatCharges==true)
            {
              this.charterBookingDetail.deductedAmount = 0;
              reservationFeeCalculation = this.charterBookingDetail?.charterFee + 20 + this.charterBookingDetail.boatDetail.taxFee;
              this.charterBookingDetail.refundableAmount = this.charterBookingDetail.deductedAmount + reservationFeeCalculation;
            }
            else
            {
              this.charterBookingDetail.deductedAmount = 0;
              reservationFeeCalculation =
                this.charterBookingDetail?.charterFee * totalDays + 20 + this.charterBookingDetail.boatDetail.taxFee;
              this.charterBookingDetail.refundableAmount = this.charterBookingDetail.deductedAmount + reservationFeeCalculation;
            }

          }
          if (remaingHours == 72 || (remaingHours < 72 && remaingHours >= 24))
          {
            if(this.charterBookingDetail?.isFullBoatCharges==true)
            {
              this.charterBookingDetail.deductedAmount = ((this.charterBookingDetail?.charterFee + 20 + this.charterBookingDetail.boatDetail.taxFee) * 50) / 100;
              reservationFeeCalculation = ((this.charterBookingDetail?.charterFee + 20 +this.charterBookingDetail.boatDetail.taxFee) * 50) / 100;
              this.charterBookingDetail.refundableAmount =  reservationFeeCalculation;
            }
            else
            {
              this.charterBookingDetail.deductedAmount = ((this.charterBookingDetail?.charterFee * totalDays + 20 + this.charterBookingDetail.boatDetail.taxFee) * 50) / 100;
              reservationFeeCalculation = ((this.charterBookingDetail?.charterFee * totalDays + 20 +this.charterBookingDetail.boatDetail.taxFee) * 50) / 100;
              this.charterBookingDetail.refundableAmount =  reservationFeeCalculation;
            }

          }
          if (remaingHours < 24)
          {
            if(this.charterBookingDetail?.isFullBoatCharges==true)
            {

              this.charterBookingDetail.deductedAmount = this.charterBookingDetail?.charterFee  + 20 + this.charterBookingDetail.boatDetail.taxFee;
              this.charterBookingDetail.refundableAmount = 0;
            }
            else
            {

              this.charterBookingDetail.deductedAmount = this.charterBookingDetail?.charterFee * totalDays + 20 + this.charterBookingDetail.boatDetail.taxFee;
              this.charterBookingDetail.refundableAmount = 0;
            }
          }
        }
        if (this.isHost) {
          this.charterBookingDetail.deductedAmount = 0;
          this.charterBookingDetail.refundableAmount =this.charterBookingDetail?.charterFee * totalDays + 20 + this.charterBookingDetail.boatDetail.taxFee;
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
    this.charterCancellationReason.bookingStatus = data.bookingDetail?.bookingStatus;
    this.charterCancellationReason.charterBookingId = data.bookingDetail?.charterId;
    this.charterCancellationReason.refundableAmount = data.refundableAmount;
    this.charterCancellationReason.totalAmount = data.deductedAmount + data.refundableAmount;
    this.charterBookingDetail.BookingType = this.filters.BOOKING_TYPE.Charters;
    this.modal.open(template, { centered: true });
  }
  confirmCancel() {
    let charterCancellationModel = {
      bookingId: Number(this.charterCancellationObject.bookingId),
      bookingType: this.filters.BOOKING_TYPE.Charters,
      reason: this.charterCancellationReason.reasonValue,
      userId: "",
      isNotificationSent: true,
      refundAmount: this.charterCancellationReason.refundableAmount.toString(),
      totalAmount: this.charterCancellationReason.totalAmount.toString(),
      bookingStatus: this.filters.BOOKING_STATUS.Cancel
    };
    this.service.savecharterBookingCancellation(charterCancellationModel)
      .subscribe((res: any) => {
        this.service.getRefundable(charterCancellationModel.bookingId,Math.floor(this.charterCancellationReason.refundableAmount)).subscribe((isRefundablePay:any) =>
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
          bookingId: this.charterCancellationObject.charterId,
          reviewDescription: res.reviewText,
          ratings: res.ratingStars,
        };
        this.service.addReview(review).subscribe((res) => {
          if (res) {
            this.modal.dismissAll();
            this.toaster.success('Review Added Successfully', 'Review');
            this.isPosted = true;
            this.listReviewComponent.getReviews();
          }
        });
      });
  }
  isReviewPosted() {
    this.service.isReviewPosted(this.charterCancellationObject.charterId).subscribe((res: any) => {
      this.isPosted = res;
    });
  }
  isBookingPassed(): boolean {
    let parsedDate = Date.parse(this.charterCancellationObject.departureToDate);
    let today = Date.parse(new Date().toString());
    return today > parsedDate ? true : false;
  }
}
