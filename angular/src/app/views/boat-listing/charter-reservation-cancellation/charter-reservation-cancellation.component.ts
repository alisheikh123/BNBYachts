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
import { YachtSearchService } from 'src/app/core/yacht-search/yacht-search.service';
import { BoatType } from 'src/app/shared/enums/boat-Type';
import { ServiceFee } from 'src/app/shared/interface/Service-fee';

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
  boatType = BoatType;
  serviceFee : ServiceFee;
  constructor(
    private service: BookingService,
    private fb: FormBuilder,
    private modal: NgbModal,
    public activatedRoute: ActivatedRoute,
    private route: Router,
    private charterService: CharterService,
    private charterBookingService: BookingListingService,
    private toaster: ToastrService,
    private yachtSearchService: YachtSearchService
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
    this.getServiceFeeByBoatType();
    let userRole = localStorage.getItem('userRole');
    userRole == this.filters.USER_ROLES.host ? (this.isHost = true) : (this.isHost = false);
    this.getCharterDetails();

    this.isReviewPosted();
  }
getCharterDetails(){
  this.charterService.getCharterDetailById(this.charterCancellationObject.charterId).subscribe((res: any) => {
    this.charterBookingDetail = res.data;
    this.charterBookingService.getCharterBookingDetailById(this.charterCancellationObject.bookingId).subscribe((bookingDetail: any) => {
      this.charterBookingDetail.bookingDetail = bookingDetail;
    });
    this.service.getBoatInfo(this.charterBookingDetail.boatId).subscribe((boatdetail: any) => {
      this.charterBookingDetail.boatDetail = boatdetail;
      this.charterCancellationObject.currentDate = moment().format('YYYY-MM-DD');
      let formattedDepartureFromDate = utils.formatDateTime(this.charterBookingDetail?.departureFromDate);
      let formattedDepartureToDate = utils.formatDateTime(this.charterBookingDetail?.departureToDate);
      let remaingHours = utils.getremaingHours(formattedDepartureFromDate);
      let totalDays = utils.differenceDateTime(formattedDepartureToDate,formattedDepartureFromDate);
      this.charterBookingDetail.TotalDays = totalDays;
      let reservationFeeCalculation = 0;
      if (this.charterBookingDetail?.bookingDetail?.bookingStatus  == this.filters.BOOKING_STATUS.Pending) {
        this.charterBookingDetail.deductedAmount = 0;
        reservationFeeCalculation = this.getReservationFeeCalculation(this.charterBookingDetail?.charterFee, this.charterBookingDetail?.bookingDetail?.noOfAdults , this.charterBookingDetail?.bookingDetail?.noOfChildrens ,Number(this.serviceFee?.serviceFee), this.charterBookingDetail.boatDetail.taxFee);
        this.charterBookingDetail.refundableAmount = this.charterBookingDetail.deductedAmount + reservationFeeCalculation;

      }
      this.getCahrterCalculatons(remaingHours,reservationFeeCalculation);
    });
  });
}
getCahrterCalculatons(remaingHours:number,reservationFeeCalculation:number){
  if (this.charterBookingDetail?.bookingDetail?.bookingStatus == this.filters.BOOKING_STATUS.Approved) {
    if (remaingHours > 72) {
      if(this.charterBookingDetail?.isFullBoatCharges==true)
      {
        this.charterBookingDetail.deductedAmount = 0;
        reservationFeeCalculation = this.charterBookingDetail?.charterFee + Number(this.serviceFee?.serviceFee) + this.charterBookingDetail.boatDetail.taxFee;
        this.charterBookingDetail.refundableAmount = this.charterBookingDetail.deductedAmount + reservationFeeCalculation;
      }
      else
      {
        this.charterBookingDetail.deductedAmount = 0;
        reservationFeeCalculation =
        this.getReservationFeeCalculation(this.charterBookingDetail?.charterFee , this.charterBookingDetail?.bookingDetail?.noOfAdults , this.charterBookingDetail?.bookingDetail?.noOfChildrens , Number(this.serviceFee?.serviceFee) , this.charterBookingDetail.boatDetail.taxFee);
        this.charterBookingDetail.refundableAmount = this.charterBookingDetail.deductedAmount + reservationFeeCalculation;
      }

    }
    if (remaingHours == 72 || (remaingHours < 72 && remaingHours >= 24))
    {
      if(this.charterBookingDetail?.isFullBoatCharges==true)
      {
        this.charterBookingDetail.deductedAmount = ((this.charterBookingDetail?.charterFee + Number(this.serviceFee?.serviceFee) + this.charterBookingDetail.boatDetail.taxFee) * 50) / 100;
        reservationFeeCalculation = ((this.charterBookingDetail?.charterFee + Number(this.serviceFee?.serviceFee) +this.charterBookingDetail.boatDetail.taxFee) * 50) / 100;
        this.charterBookingDetail.refundableAmount =  reservationFeeCalculation;
      }
      else
      {
        this.charterBookingDetail.deductedAmount = ((this.charterBookingDetail?.charterFee * this.charterBookingDetail?.bookingDetail?.noOfAdults + this.charterBookingDetail?.bookingDetail?.noOfChildrens + Number(this.serviceFee?.serviceFee) + this.charterBookingDetail.boatDetail.taxFee) * 50) / 100;
        reservationFeeCalculation = ((this.charterBookingDetail?.charterFee * this.charterBookingDetail?.bookingDetail?.noOfAdults + this.charterBookingDetail?.bookingDetail?.noOfChildrens + Number(this.serviceFee?.serviceFee) +this.charterBookingDetail.boatDetail.taxFee) * 50) / 100;
        this.charterBookingDetail.refundableAmount =  reservationFeeCalculation;
      }

    }
    if (remaingHours < 24)
    {
      if(this.charterBookingDetail?.isFullBoatCharges==true)
      {

        this.charterBookingDetail.deductedAmount = this.charterBookingDetail?.charterFee  + Number(this.serviceFee?.serviceFee) + this.charterBookingDetail.boatDetail.taxFee;
        this.charterBookingDetail.refundableAmount = 0;
      }
      else
      {

        this.charterBookingDetail.deductedAmount = this.charterBookingDetail?.charterFee * this.charterBookingDetail?.bookingDetail?.noOfAdults + this.charterBookingDetail?.bookingDetail?.noOfChildrens + Number(this.serviceFee?.serviceFee) + this.charterBookingDetail.boatDetail.taxFee;
        this.charterBookingDetail.refundableAmount = 0;
      }
    }
  }
  if (this.isHost) {
    this.charterBookingDetail.deductedAmount = 0;
    this.charterBookingDetail.refundableAmount =this.charterBookingDetail?.charterFee * this.charterBookingDetail?.bookingDetail?.noOfAdults + this.charterBookingDetail?.bookingDetail?.noOfChildrens + Number(this.serviceFee?.serviceFee) + this.charterBookingDetail.boatDetail.taxFee;
  }
}
  getReservationFeeCalculation(charterFee: number, noOfAdults: number, noOfChildrens: number,serviceFee :number, boatTaxFee: number):number {
   return charterFee * noOfAdults + noOfChildrens + serviceFee + boatTaxFee;
  }

  getServiceFeeByBoatType() {
    this.yachtSearchService.getServiceFeeByBoatType(this.boatType.Charter).subscribe((res: any) => {
      this.serviceFee = res.data;
    });
  }
  getTotal():number{
    return this.getReservationFeeCalculation(this.charterBookingDetail?.charterFee , this.charterBookingDetail?.bookingDetail?.noOfAdults , this.charterBookingDetail?.bookingDetail?.noOfChildrens , Number(this.serviceFee?.serviceFee) ,
    this.charterBookingDetail?.boatDetail?.taxFee);
  }
  
  getTotalGuests():number{
    return this.charterBookingDetail?.bookingDetail?.noOfAdults + this.charterBookingDetail?.bookingDetail?.noOfChildrens
  }
  getFullBoatTotalCharges():number{
    return this.charterBookingDetail?.charterFee +Number(this.serviceFee?.serviceFee) +
      this.charterBookingDetail?.boatDetail?.taxFee
  }
  basicCharges():number{
  return  this.charterBookingDetail?.charterFee * this.getTotalGuests();
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
        this.service.getRefundable(charterCancellationModel.bookingId,Math.floor(this.charterCancellationReason.refundableAmount), this.isHost, charterCancellationModel.bookingType).subscribe((isRefundablePay:any) =>
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
