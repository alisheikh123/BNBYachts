import { FormBuilder, FormControlName, FormGroup } from '@angular/forms';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BookingService } from 'src/app/core/Booking/booking.service';
import { Guid } from 'guid-typescript';
import { utils } from 'src/app/shared/utility/utils';


@Component({
  selector: 'app-reservation-cancellation',
  templateUrl: './reservation-cancellation.component.html'
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
  currentTime: any
  checkoutTime: any
  currentCombindDateTime: any;
  checkinCombindDateTime: any;
  checkoutCombindDateTime: any;
  totalHours: any;
  bookingStatus: any;
  isHost:boolean;
  constructor(private service: BookingService, private fb: FormBuilder, private modal: NgbModal, public activatedRoute: ActivatedRoute, private route: Router, private modalService: NgbModal) { }
  @ViewChild('template') templateRef: TemplateRef<any>;
  @ViewChild('bookingstatus') bookingtemplate: TemplateRef<any>;
  @ViewChild('bookingcancelled') cancelledRef: TemplateRef<any>;
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(res => {
      this.bkCancel = res['id'].toString();

    });
    //Check if Host
    var userRole = localStorage.getItem('userRole');
    (userRole == 'a8e857de-7ca6-f663-feb0-3a003661104b')? this.isHost = true: this.isHost = false;
    //
    this.service.getBookingBoatDetail(this.bkCancel).subscribe((res: any) => {
      this.bookingCancelDetail = res;

      res.forEach((elem: any) => {


        this.currentDate = utils.formatDate(new Date());

        // From BookingDetail
        this.checkInDate = utils.formatDate(elem?.checkinDate);
        this.checkOutDate = utils.formatDate(elem?.checkoutDate);

        this.service.getBoatInfo(elem.boatId).subscribe((boatdetail: any) => {
          elem.boatDetail = boatdetail;
          // Convert DateTime Format to Date Format
          this.currentTime = utils.formatTime(new Date());
          this.checkInTime = utils.formatTime(boatdetail.checkinTime);
          this.checkoutTime = utils.formatTime(boatdetail.checkoutTime);

          // Concat current date with current Time
          this.currentCombindDateTime = new Date(this.currentDate + ' ' + this.currentTime);
          // Concat checkin date with checkin Time
          this.checkinCombindDateTime = new Date(this.checkInDate + ' ' + this.checkInTime);
          // Concat checkout date with checkin Time
          this.checkoutCombindDateTime = new Date(this.checkOutDate + ' ' + this.checkoutTime);

          // Calculate Remaing
          this.remaingHours = Math.abs(this.checkinCombindDateTime - this.currentCombindDateTime) / 36e5;

          // Add in booking Detail
          elem.currentCombindDateTime = this.currentCombindDateTime;
          elem.checkinCombindDateTime = this.checkinCombindDateTime;
          elem.checkoutCombindDateTime = this.checkoutCombindDateTime;
          elem.remaingHours = this.remaingHours;


          this.remainingDays = Math.ceil((this.checkinCombindDateTime - this.currentCombindDateTime) / 8.64e7) + 1;
          this.totalDays = Math.ceil((this.checkoutCombindDateTime - this.checkinCombindDateTime) / 8.64e7) + 1;

          // Add in booking Detail
          elem.remaingDays = this.remainingDays;
          elem.TotalDays = this.totalDays;

          if (elem.bookingStatus == 0) {

            // Refund 100%
            elem.deductedAmount = 0;
            elem.totalreservationFee = (elem.boatDetail.perDayCharges * elem.TotalDays) + 20 + (elem.boatDetail.taxFee);
            elem.totalAmount = elem.deductedAmount + elem.totalreservationFee;

            // this.service.getRefundable(elem.id, elem.totalreservationFee).subscribe((res: any) => {
            //   if (res == true) {

            //   }
            //   else {
            //     this.modal.open(this.bookingtemplate);
            //   }
            // });
          }
          else {


            if (this.remaingHours > 72) {

              // Refund 100%
              elem.deductedAmount = 0;
              elem.totalreservationFee = (elem.boatDetail.perDayCharges * elem.TotalDays) + 20 + (elem.boatDetail.taxFee);
              elem.totalAmount = elem.deductedAmount + elem.totalreservationFee;

              // this.service.getRefundable(elem.id, elem.totalreservationFee).subscribe((res: any) => {
              //   if (res == true) {

              //   }
              //   else {
              //     this.modal.open(this.bookingtemplate);
              //   }
              // });

            }
            if (this.remaingHours == 72 || (this.remaingHours < 72 && this.remaingHours >= 24)) {

              // deducted 50%
              elem.deductedAmount = ((elem.boatDetail.perDayCharges * elem.TotalDays) + 20 + (elem.boatDetail.taxFee)) * 50 / 100;
              elem.totalreservationFee = ((elem.boatDetail.perDayCharges * elem.TotalDays) + 20 + (elem.boatDetail.taxFee)) * 50 / 100;
              elem.totalAmount = elem.deductedAmount + elem.totalreservationFee;


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
              elem.deductedAmount = (elem.boatDetail.perDayCharges * 1);
              elem.totalreservationFee = (elem.boatDetail.perDayCharges * elem.TotalDays) + 20 + (elem.boatDetail.taxFee) - (elem.boatDetail.perDayCharges * this.remainingDays);
              elem.totalAmount = elem.deductedAmount + elem.totalreservationFee;

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

    });
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
      BookingStatus: 3
    };



    this.service.saveCancellation(bookingCancellationModel).subscribe((res: any) => {

      if (res == true) {
        this.service.getRefundable(bookingCancellationModel.BookingId, bookingCancellationModel.RefundAmount).subscribe((res: any) => {
          if (res == true) {
            this.modal.dismissAll();
            this.modal.open(this.cancelledRef);
          }
          else {
            this.modal.open(this.bookingtemplate);
          }
        });        
      }
      else {
      }
    });
  }

}
