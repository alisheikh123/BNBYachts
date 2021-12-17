import { FormBuilder, FormControlName, FormGroup } from '@angular/forms';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BookingService } from 'src/app/core/Booking/booking.service';
import { Guid } from 'guid-typescript';
import { utils } from 'src/app/shared/utility/utils';
import { AddReviewModalComponent } from '../../common/add-review-modal/add-review-modal.component';
import { ToastrService } from 'ngx-toastr';
import { ListReviewsComponent } from '../../common/list-reviews/list-reviews.component';
import { BookingStatus } from 'src/app/shared/enums/booking.constants';
import { BookingListingService } from 'src/app/core/Booking/booking-listing.service';

@Component({
  selector: 'app-reservation-cancellation',
  templateUrl: './reservation-cancellation.component.html',
})
export class ReservationCancellationComponent implements OnInit {
  public bkCancel: any;
  public bookingCancelDetail: any;
  checkInDate: any;
  checkOutDate: any;
  totalDays: any;
  isCancellationModal: boolean = false;
  remainingDays: any;
  remaingHours: any;
  currentDate: any;
  Reason: string = '';
  userId: any;
  bookingId: any;
  bookingType: any;
  refundAmount: any;
  totalAmount: any;
  ReasonValue: string;
  currentDateHours: any;
  checkInTime: any;
  currentTime: any;
  checkoutTime: any;
  currentCombindDateTime: any;
  checkinCombindDateTime: any;
  checkoutCombindDateTime: any;
  totalHours: any;
  bookingStatus: any;
  isHost: boolean;
  isPosted: boolean;
  isChanged: boolean;
  BOOKING_STATUS = BookingStatus

  constructor(
    private service: BookingService,
    private fb: FormBuilder,
    private modal: NgbModal,
    public activatedRoute: ActivatedRoute,
    private route: Router,
    private bookingListingService:BookingListingService,
    private toaster: ToastrService
  ) {}
  @ViewChild('template') templateRef: TemplateRef<any>;
  @ViewChild('bookingstatus') bookingtemplate: TemplateRef<any>;
  @ViewChild('bookingcancelled') cancelledRef: TemplateRef<any>;
  @ViewChild(ListReviewsComponent) listReviewComponent: ListReviewsComponent;
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((res) => {
      this.bkCancel = res['id'].toString();
    });
    //Check if Host
    var userRole = localStorage.getItem('userRole');
    userRole == 'a8e857de-7ca6-f663-feb0-3a003661104b'
      ? (this.isHost = true)
      : (this.isHost = false);
    //
    this.bookingListingService.getBookingDetailbyId(this.bkCancel).subscribe((res: any) => {
      this.bookingCancelDetail = res;
        this.currentDate = utils.formatDate(new Date());

        // From BookingDetail
        this.checkInDate = utils.formatDate(this.bookingCancelDetail?.checkinDate);
        this.checkOutDate = utils.formatDate(this.bookingCancelDetail?.checkoutDate);

        this.service.getBoatInfo(this.bookingCancelDetail.boatId).subscribe((boatdetail: any) => {
          this.bookingCancelDetail.boatDetail = boatdetail;
          // Convert DateTime Format to Date Format
          this.currentTime = utils.formatTime(new Date());
          this.checkInTime = utils.formatTime(boatdetail.checkinTime);
          this.checkoutTime = utils.formatTime(boatdetail.checkoutTime);

          // Concat current date with current Time
          this.currentCombindDateTime = new Date(
            this.currentDate + ' ' + this.currentTime
          );
          // Concat checkin date with checkin Time
          this.checkinCombindDateTime = new Date(
            this.checkInDate + ' ' + this.checkInTime
          );
          // Concat checkout date with checkin Time
          this.checkoutCombindDateTime = new Date(
            this.checkOutDate + ' ' + this.checkoutTime
          );

          // Calculate Remaing
          this.remaingHours =
            Math.abs(
              this.checkinCombindDateTime - this.currentCombindDateTime
            ) / 36e5;

          // Add in booking Detail
          this.bookingCancelDetail.currentCombindDateTime = this.currentCombindDateTime;
          this.bookingCancelDetail.checkinCombindDateTime = this.checkinCombindDateTime;
          this.bookingCancelDetail.checkoutCombindDateTime = this.checkoutCombindDateTime;
          this.bookingCancelDetail.remaingHours = this.remaingHours;

          this.remainingDays = Math.ceil(
            (this.checkinCombindDateTime - this.currentCombindDateTime) / 8.64e7
          );
          this.totalDays = Math.ceil(
            (this.checkoutCombindDateTime - this.checkinCombindDateTime) /
              8.64e7
          );

          // Add in booking Detail
          this.bookingCancelDetail.remaingDays = this.remainingDays;
          this.bookingCancelDetail.TotalDays = this.totalDays;

          if (this.bookingCancelDetail.bookingStatus == 0) {
            // Refund 100%
            this.bookingCancelDetail.deductedAmount = 0;
            this.bookingCancelDetail.totalreservationFee =
            this.bookingCancelDetail.boatDetail.perDayCharges * this.bookingCancelDetail.TotalDays +
              20 +
              this.bookingCancelDetail.boatDetail.taxFee;
              this.bookingCancelDetail.totalAmount = this.bookingCancelDetail.deductedAmount + this.bookingCancelDetail.totalreservationFee;

            // this.service.getRefundable(elem.id, elem.totalreservationFee).subscribe((res: any) => {
            //   if (res == true) {

            //   }
            //   else {
            //     this.modal.open(this.bookingtemplate);
            //   }
            // });
          } else {
            if (this.remaingHours > 72) {
              // Refund 100%
              this.bookingCancelDetail.deductedAmount = 0;
              this.bookingCancelDetail.totalreservationFee =
              this.bookingCancelDetail.boatDetail.perDayCharges * this.bookingCancelDetail.TotalDays +
                20 +
                this.bookingCancelDetail.boatDetail.taxFee;
                this.bookingCancelDetail.totalAmount = this.bookingCancelDetail.deductedAmount + this.bookingCancelDetail.totalreservationFee;

              // this.service.getRefundable(elem.id, elem.totalreservationFee).subscribe((res: any) => {
              //   if (res == true) {

              //   }
              //   else {
              //     this.modal.open(this.bookingtemplate);
              //   }
              // });
            }
            if (
              this.remaingHours == 72 ||
              (this.remaingHours < 72 && this.remaingHours >= 24)
            ) {
              // deducted 50%
              this.bookingCancelDetail.deductedAmount =
                ((this.bookingCancelDetail.boatDetail.perDayCharges * this.bookingCancelDetail.TotalDays +
                  20 +
                  this.bookingCancelDetail.boatDetail.taxFee) *
                  50) /
                100;
                this.bookingCancelDetail.totalreservationFee =
                ((this.bookingCancelDetail.boatDetail.perDayCharges * this.bookingCancelDetail.TotalDays +
                  20 +
                  this.bookingCancelDetail.boatDetail.taxFee) *
                  50) /
                100;
                this.bookingCancelDetail.totalAmount = this.bookingCancelDetail.deductedAmount + this.bookingCancelDetail.totalreservationFee;

              // this.service.getRefundable(elem.id, elem.totalreservationFee).subscribe((res: any) => {
              //   if (res == true) {

              //   }
              //   else {
              //     this.modal.open(this.bookingtemplate);
              //   }
              // });
            }
            if (this.remaingHours < 24) {
              // Deducted 1 Night Fee
              this.bookingCancelDetail.deductedAmount = this.bookingCancelDetail.boatDetail.perDayCharges * 1;
              this.bookingCancelDetail.totalreservationFee =
              this.bookingCancelDetail.boatDetail.perDayCharges * this.bookingCancelDetail.TotalDays +
                20 +
                this.bookingCancelDetail.boatDetail.taxFee -
                this.bookingCancelDetail.boatDetail.perDayCharges * this.remainingDays;
                this.bookingCancelDetail.totalAmount = this.bookingCancelDetail.deductedAmount + this.bookingCancelDetail.totalreservationFee;

              // this.service.getRefundable(elem.id, elem.totalreservationFee).subscribe((res: any) => {
              //   if (res == true) {

              //   }
              //   else {
              //     this.modal.open(this.bookingtemplate);
              //   }
              // });
            }
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
    this.bookingStatus = data.bookingStatus;
    this.bookingId = data.id;
    this.bookingType = 0;
    this.refundAmount = data.totalAmount - data.deductedAmount;
    this.userId = data.userId;
    this.totalAmount = data.totalAmount;
    this.ReasonValue = this.Reason;
    this.modal.open(template);
  }
  confirmCancel() {
    let bookingCancellationModel = {
      BookingId: this.bookingId,
      BookingType: this.bookingType,
      Reason: this.ReasonValue,
      UserId: this.userId.toString(),
      isNotificationSent: true,
      RefundAmount: this.refundAmount.toString(),
      TotalAmount: this.totalAmount.toString(),
      BookingStatus: 3,
    };
    this.service
      .saveCancellation(bookingCancellationModel)
      .subscribe((res: any) => {
        if (res == true) {
          this.service
            .getRefundable(
              bookingCancellationModel.BookingId,
              bookingCancellationModel.RefundAmount
            )
            .subscribe((res: any) => {
              if (res == true) {
                this.modal.dismissAll();
                this.modal.open(this.cancelledRef);
              } else {
                this.modal.open(this.bookingtemplate);
              }
            });
        } else {
        }
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
          bookingId: this.bkCancel,
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
    this.service.isReviewPosted(this.bkCancel).subscribe((res: any) => {
      this.isPosted = res;
    });
  }
  isBookingPassed(): boolean {
    let parsedDate = Date.parse(this.checkOutDate);
    let today = Date.parse(new Date().toISOString().slice(0, 10));
    return (today > parsedDate) ? true : false;
  }
}
