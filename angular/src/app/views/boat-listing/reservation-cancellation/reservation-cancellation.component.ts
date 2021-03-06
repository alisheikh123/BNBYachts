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
import { BookingStatus, ContractStaus } from 'src/app/shared/enums/booking.constants';
import { BookingListingService } from 'src/app/core/Booking/booking-listing.service';
import { ContractsService } from 'src/app/core/contracts/contracts.service';
import { YachtSearchService } from 'src/app/core/yacht-search/yacht-search.service';
import { BoatType } from 'src/app/shared/enums/boat-Type';
import { ServiceFee } from 'src/app/shared/interface/Service-fee';
import { BoatServiceType } from 'src/app/shared/enums/boat-service-type';

@Component({
  selector: 'app-reservation-cancellation',
  templateUrl: './reservation-cancellation.component.html',
})
export class ReservationCancellationComponent implements OnInit {
  public bkCancel: any;
  public bookingCancelDetail: any;
  isCancellationModal: boolean = false;
  Reason: string = '';
  userId: any;
  bookingId: any;
  bookingType: any;
  refundAmount: any;
  totalAmount: any;
  ReasonValue: string;
  currentDateHours: any;
  currentCombindDateTime: any;
  checkinCombindDateTime: any;
  checkoutCombindDateTime: any;
  totalHours: any;
  bookingStatus: any;
  isHost: boolean;
  isPosted: boolean;
  isChanged: boolean;
  BOOKING_STATUS = BookingStatus
  contractId: string;
  bookedServicesTypes = BoatServiceType;
  boatType = BoatType;
  serviceFee : ServiceFee;
  constructor(
    private service: BookingService,
    private fb: FormBuilder,
    private modal: NgbModal,
    public activatedRoute: ActivatedRoute,
    private route: Router,
    private bookingListingService: BookingListingService,
    private toaster: ToastrService,
    private contractService: ContractsService,
    private boatService: YachtSearchService,
  ) { }
  @ViewChild('template') templateRef: TemplateRef<any>;
  @ViewChild('bookingstatus') bookingtemplate: TemplateRef<any>;
  @ViewChild('bookingcancelled') cancelledRef: TemplateRef<any>;
  @ViewChild(ListReviewsComponent) listReviewComponent: ListReviewsComponent;
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((res) => {
      this.bkCancel = res['id'].toString();
      this.contractId = res['contractId'].toString();
    });
    this.getServiceFeeByBoatType();
    var userRole = localStorage.getItem('userRole');
    userRole == 'a8e857de-7ca6-f663-feb0-3a003661104b'
      ? (this.isHost = true)
      : (this.isHost = false);
    if (this.contractId == null) {
      this.bookingListingService.getBookingDetailbyId(this.bkCancel).subscribe((res: any) => {
        this.bookingCancelDetail = res;
        let currentDate = utils.convertDateToYearMonthDay(new Date());
        let currentTime = utils.formatTime(new Date());
        let checkInDate = utils.convertDateToYearMonthDay(this.bookingCancelDetail?.checkinDate);
        let checkOutDate = utils.convertDateToYearMonthDay(this.bookingCancelDetail?.checkoutDate);
        this.service.getBoatInfo(this.bookingCancelDetail.boatId).subscribe((boatdetail: any) => {
          this.bookingCancelDetail.boatDetail = boatdetail;
          let checkInTime = utils.formatTime(boatdetail.checkinTime);
          let checkoutTime = utils.formatTime(boatdetail.checkoutTime);
          this.currentCombindDateTime = new Date(
            currentDate + ' ' + currentTime
          );
          this.checkinCombindDateTime = new Date(
            checkInDate + ' ' + checkInTime
          );
          this.checkoutCombindDateTime = new Date(
            checkOutDate + ' ' + checkoutTime
          );
          let remaingHours = utils.getRemaingHours(this.checkinCombindDateTime, this.currentCombindDateTime);
          this.bookingCancelDetail.currentCombindDateTime = this.currentCombindDateTime;
          this.bookingCancelDetail.checkinCombindDateTime = this.checkinCombindDateTime;
          this.bookingCancelDetail.checkoutCombindDateTime = this.checkoutCombindDateTime;
          this.bookingCancelDetail.remaingHours = remaingHours;

          let remainingDays = utils.getDaysBetweenTwoDates(this.currentCombindDateTime, this.checkinCombindDateTime);
          this.bookingCancelDetail.TotalDays = utils.getDaysBetweenTwoDates(this.checkinCombindDateTime, this.checkoutCombindDateTime);
          this.bookingCancelDetail.remaingDays = remainingDays;
          if (this.bookingCancelDetail.bookingStatus == this.BOOKING_STATUS.Pending) {
            // Refund 100%
            this.bookingCancelDetail.deductedAmount = 0;
            this.bookingCancelDetail.totalreservationFee =
              this.bookingCancelDetail.boatDetail.perDayCharges * this.bookingCancelDetail.TotalDays + Number(this.serviceFee?.serviceFee) + this.bookingCancelDetail.boatDetail.taxFee;
            this.bookingCancelDetail.totalAmount = this.bookingCancelDetail.deductedAmount + this.bookingCancelDetail.totalreservationFee;
          }
          if (this.bookingCancelDetail.bookingStatus == this.BOOKING_STATUS.Approved) {
            if (remaingHours > 72) {
              this.bookingCancelDetail.deductedAmount = 0;
              this.bookingCancelDetail.totalreservationFee =
                this.bookingCancelDetail.boatDetail.perDayCharges * this.bookingCancelDetail.TotalDays + Number(this.serviceFee?.serviceFee) + this.bookingCancelDetail.boatDetail.taxFee;
              this.bookingCancelDetail.totalAmount = this.bookingCancelDetail.deductedAmount + this.bookingCancelDetail.totalreservationFee;
            }
            if (remaingHours == 72 || (remaingHours < 72 && remaingHours >= 24)) {
              this.bookingCancelDetail.deductedAmount =
                ((this.bookingCancelDetail.boatDetail.perDayCharges * this.bookingCancelDetail.TotalDays + Number(this.serviceFee?.serviceFee) + this.bookingCancelDetail.boatDetail.taxFee) * 50) / 100;
              this.bookingCancelDetail.totalreservationFee =
                ((this.bookingCancelDetail.boatDetail.perDayCharges * this.bookingCancelDetail.TotalDays +
                  Number(this.serviceFee?.serviceFee) +
                  this.bookingCancelDetail.boatDetail.taxFee) *
                  50) /
                100;
              this.bookingCancelDetail.totalAmount = this.bookingCancelDetail.deductedAmount + this.bookingCancelDetail.totalreservationFee;
            }
            if (remaingHours < 24) {
              this.bookingCancelDetail.deductedAmount = this.bookingCancelDetail.boatDetail.perDayCharges * 1;
              this.bookingCancelDetail.totalreservationFee =
                this.bookingCancelDetail.boatDetail.perDayCharges * this.bookingCancelDetail.TotalDays +
                Number(this.serviceFee?.serviceFee) +
                this.bookingCancelDetail.boatDetail.taxFee -
                this.bookingCancelDetail.boatDetail.perDayCharges * remainingDays;
              this.bookingCancelDetail.totalAmount = this.bookingCancelDetail.totalreservationFee;
            }
          }
          if (this.isHost) {
            this.bookingCancelDetail.deductedAmount = (this.bookingCancelDetail.boatDetail.perDayCharges * this.bookingCancelDetail.TotalDays + Number(this.serviceFee?.serviceFee) + this.bookingCancelDetail.boatDetail.taxFee) * 0.029 + 0.030;
            this.bookingCancelDetail.totalAmount = this.bookingCancelDetail.totalreservationFee - this.bookingCancelDetail.deductedAmount;
          }
        });
      });
    }
    else {
      this.contractService.getContractById(parseInt(this.contractId)).subscribe((res: any) => {
        this.bookingCancelDetail = res.data;
        let currentDate = utils.convertDateToYearMonthDay(new Date());
        let currentTime = utils.formatTime(new Date());
        let checkInDate = utils.convertDateToYearMonthDay(this.bookingCancelDetail?.serviceType == this.bookedServicesTypes.Event ? this.bookingCancelDetail?.eventDateTime : this.bookingCancelDetail.departureDate);
        let checkOutDate = utils.convertDateToYearMonthDay(this.bookingCancelDetail?.serviceType == this.bookedServicesTypes.Event ? currentDate : this.bookingCancelDetail.arrivalDate);
        this.service.getBoatInfo(this.bookingCancelDetail.boatId).subscribe((boatdetail: any) => {
          this.bookingCancelDetail.boatDetail = boatdetail;
          let checkInTime = utils.formatTime(boatdetail.checkinTime);
          let checkoutTime = utils.formatTime(this.bookingCancelDetail.arrivalDate);
          this.currentCombindDateTime = new Date(
            currentDate + ' ' + currentTime
          );
          this.checkinCombindDateTime = new Date(
            checkInDate + ' ' + checkInTime
          );
          this.checkoutCombindDateTime = new Date(
            checkOutDate + ' ' + (this.bookingCancelDetail?.serviceType == this.bookedServicesTypes.Event ? currentTime : utils.formatTime(this.bookingCancelDetail.arrivalDate)
            ));
          let remaingHours = utils.getRemaingHours(this.checkinCombindDateTime, this.currentCombindDateTime);
          this.bookingCancelDetail.currentCombindDateTime = this.currentCombindDateTime;
          this.bookingCancelDetail.checkinCombindDateTime = this.checkinCombindDateTime;
          this.bookingCancelDetail.checkoutCombindDateTime = this.checkoutCombindDateTime;
          this.bookingCancelDetail.remaingHours = remaingHours;

          let remainingDays = utils.getDaysBetweenTwoDates(this.currentCombindDateTime, this.checkinCombindDateTime);
          this.bookingCancelDetail.TotalDays = this.bookingCancelDetail?.serviceType == this.bookedServicesTypes.Event ? 1 : utils.getDaysBetweenTwoDates(this.checkinCombindDateTime, this.checkoutCombindDateTime);
          this.bookingCancelDetail.remaingDays = remainingDays;
          this.getBookngCalculations(remaingHours,remainingDays);
        });
      });
    }


    this.isReviewPosted();
  }
  getBookngCalculations(remaingHours: number,remainingDays:number){
    if (this.bookingCancelDetail.status == ContractStaus.Pending) {
      // Refund 100%
      this.bookingCancelDetail.deductedAmount = 0;
      this.bookingCancelDetail.totalreservationFee =
        this.bookingCancelDetail.qouteAmount + Number(this.serviceFee?.serviceFee) + this.bookingCancelDetail.boatDetail.taxFee;
      this.bookingCancelDetail.totalAmount = this.bookingCancelDetail.deductedAmount + this.bookingCancelDetail.totalreservationFee;
    }
    if (this.bookingCancelDetail.status == ContractStaus.Active) {
      if (remaingHours > 72) {
        this.bookingCancelDetail.deductedAmount = 0;
        this.bookingCancelDetail.totalreservationFee =
          this.bookingCancelDetail.qouteAmount + Number(this.serviceFee?.serviceFee) + this.bookingCancelDetail.boatDetail.taxFee;
        this.bookingCancelDetail.totalAmount = this.bookingCancelDetail.deductedAmount + this.bookingCancelDetail.totalreservationFee;
      }
      if (remaingHours == 72 || (remaingHours < 72 && remaingHours >= 24)) {
        this.bookingCancelDetail.deductedAmount =
          ((this.bookingCancelDetail.qouteAmount + Number(this.serviceFee?.serviceFee) + this.bookingCancelDetail.boatDetail.taxFee) * 50) / 100;
        this.bookingCancelDetail.totalreservationFee =
          ((this.bookingCancelDetail.qouteAmount +
            Number(this.serviceFee?.serviceFee) +
            this.bookingCancelDetail.boatDetail.taxFee) *
            50) /
          100;
        this.bookingCancelDetail.totalAmount = this.bookingCancelDetail.deductedAmount + this.bookingCancelDetail.totalreservationFee;
      }
      if (remaingHours < 24) {
        this.bookingCancelDetail.deductedAmount = this.bookingCancelDetail.boatDetail.perDayCharges * 1;
        this.bookingCancelDetail.totalreservationFee =
          this.bookingCancelDetail.qouteAmount +
          Number(this.serviceFee?.serviceFee) +
          this.bookingCancelDetail.boatDetail.taxFee -
          this.bookingCancelDetail.boatDetail.perDayCharges * remainingDays;
        this.bookingCancelDetail.totalAmount = this.bookingCancelDetail.totalreservationFee;
      }
    }
    if (this.isHost) {
      this.bookingCancelDetail.deductedAmount = 0;
      this.bookingCancelDetail.totalAmount = this.getBasicTotal();
    }
  }
  getServiceFeeByBoatType() {
    this.boatService.getServiceFeeByBoatType(this.bookingCancelDetail?.serviceType == this.bookedServicesTypes.Charter ? this.boatType.Charter : this.boatType.Event).subscribe((res: any) => {
      this.serviceFee = res.data;
    });
  }
  getBasicTotal():number{
    return this.bookingCancelDetail?.qouteAmount + Number(this.serviceFee?.serviceFee) +
    this.bookingCancelDetail?.boatDetail?.taxFee;
  }
  getTotalGuests(): number {
    return this.bookingCancelDetail?.noOfAdults + this.bookingCancelDetail?.noOfChildrens;
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
    this.modal.open(template, { centered: true });
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
          this.service.getRefundable(bookingCancellationModel.BookingId,Math.floor(bookingCancellationModel.RefundAmount),this.isHost, bookingCancellationModel.BookingType)
          .subscribe(data => {});
          this.modal.dismissAll();
          this.modal.open(this.cancelledRef);
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
          revieweeID: this.bookingCancelDetail?.hostId,
          boatId: boatId,
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
    let parsedDate = Date.parse(this.checkoutCombindDateTime);
    let today = Date.parse(new Date().toString());
    return today > parsedDate ? true : false;
  }
}
