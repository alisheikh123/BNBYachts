import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { BookingListingService } from 'src/app/core/Booking/booking-listing.service';
import { BookingService } from 'src/app/core/Booking/booking.service';
import { ReservationListsService } from 'src/app/core/host/reservation-lists.service';
import { BookingStatus } from 'src/app/shared/enums/booking.constants';
import { UserRoles } from 'src/app/shared/enums/user-roles';
import { utils } from 'src/app/shared/utility/utils';
import { environment } from 'src/environments/environment';
import { AddReviewModalComponent } from '../../common/add-review-modal/add-review-modal.component';
import { ConfirmDialogComponent } from '../../common/confirm-dialog/confirm-dialog.component';
import { ListReviewsComponent } from '../../common/list-reviews/list-reviews.component';
import { RejectionModalComponent } from '../../host/boatel-bookings/booking-requests/rejection-modal/rejection-modal.component';

@Component({
  selector: 'app-reservation-detail',
  templateUrl: './reservation-detail.component.html',
  styleUrls: ['./reservation-detail.component.scss']
})
export class ReservationDetailComponent implements OnInit {

  bookingId: number;
  booking: any;
  checkInDate: any;
  checkOutDate: any;
  totalDays: any;
  currentDate: any;
  hideCancellationbtn: boolean;
  isHourslessthanones: any;
  isCurrentDateGreater: any;
  isPosted: boolean;
  BOOKING_STATUS = BookingStatus;
  isHost: boolean = false;
  USER_ROLES = UserRoles;
  today = new Date().toLocaleDateString();
  bookingStatus: any;
  checkedCheckinDate: any;
  checkinTime: any;
  checkoutTime:any;
  assetsUrl = environment.S3BUCKET_URL + '/boatGallery/';
  @ViewChild(ListReviewsComponent) listReviewComponent: ListReviewsComponent;
  boatDetail: any;
  showMore = false;
  isUserHost:boolean;
  cancelledBookingDetails:any;
  constructor(private service: BookingService
    , private bookingListService: BookingListingService,
    public activatedRoute: ActivatedRoute, private route: Router,
    private modal: NgbModal, private toastr: ToastrService,
    private reservationService: ReservationListsService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(res => {
      this.bookingId = Number(res['id']);
    });
    var userRole = localStorage.getItem('userRole');
    userRole == this.USER_ROLES.host
      ? (this.isHost = true)
      : (this.isHost = false);
    this.isUserHost = localStorage.getItem('userRole') ==  this.USER_ROLES.host? (this.isHost = true): (this.isHost = false);
    this.bookingListService.getBookingDetailbyId(this.bookingId).subscribe((res: any) => {
      this.booking = res;
      this.currentDate = new Date();
      this.checkedCheckinDate = utils.convertToDate(this.booking?.checkinDate);
      this.checkInDate = new Date(this.booking?.checkinDate);
      this.checkOutDate = new Date(this.booking?.checkoutDate);
      this.totalDays = utils.differenceDates(this.checkInDate,this.checkOutDate);
      this.service.getBoatInfo(this.booking.boatId).subscribe((boatdetail: any) => {
        this.booking.boatDetail = boatdetail;
        this.booking.TotalDays = this.totalDays;
        this.booking.checkinDate = this.checkInDate;
        this.booking.checkoutDate = this.checkOutDate;
        this.boatDetail = boatdetail;
        this.checkinTime = this.booking?.boatDetail?.checkinTime;
      });
      if(this.booking.bookingStatus == this.BOOKING_STATUS.Cancel){
        this.getRefundDetails();
      }

    });
    this.isReviewPosted();

  }
  addReview() {
    this.modal.open(AddReviewModalComponent, { windowClass: 'custom-modal custom-small-modal', centered: true }).componentInstance.onSave.subscribe((res: any) => {
      let review = {
        revieweeID : this.booking?.hostId,
        boatId: this.booking?.boatId,
        bookingId: this.bookingId,
        reviewDescription: res.reviewText,
        ratings: res.ratingStars
      };
      this.service.addReview(review).subscribe(res => {
        if (res) {
          this.modal.dismissAll();
          this.toastr.success("Review Added Successfully", "Review");
          this.isPosted = true;
          this.listReviewComponent.getReviews();
        }
      });
    });
  }
  isReviewPosted() {
    this.service.isReviewPosted(this.bookingId).subscribe((res: any) => {
      this.isPosted = res;
    });
  }
  isBookingPassed(): boolean {
    debugger;
    let parsedDate = Date.parse(this.boatDetail?.checkoutTime);
    let today = Date.parse(new Date().toISOString());
    return (today > parsedDate) ? true : false;
  }

  goBack() {
    if (this.isHost) {
      this.route.navigate(['host/my-bookings']);
    }
    else {
      this.route.navigate(['boat-listing/all-reservations']);
    }
  }
  isBookingStatusCancel(bookingId: number) {

    this.bookingListService.getBookingDetailbyId(bookingId).subscribe((res: any) => {
      this.bookingStatus = res?.bookingStatus;
      this.booking = res;
      this.currentDate = new Date();
      this.checkedCheckinDate = utils.convertToDate(this.booking?.checkinDate);
      this.checkInDate = new Date(this.booking?.checkinDate);
      this.checkOutDate = new Date(this.booking?.checkoutDate);
      this.totalDays = utils.differenceDates(this.checkInDate,this.checkOutDate);
      if (this.bookingStatus != this.BOOKING_STATUS.Cancel) {

        this.service.getBoatInfo(this.booking.boatId).subscribe((boatdetail: any) => {
          this.booking.boatDetail = boatdetail;
          this.booking.TotalDays = this.totalDays;
          this.booking.checkinDate = this.checkInDate;
          this.booking.checkoutDate = this.checkOutDate;
          this.boatDetail = boatdetail;
        });


      }
      else {
        this.service.getBoatInfo(this.booking.boatId).subscribe((boatdetail: any) => {
          this.service.getBookingCancellationDetail(this.booking?.id).subscribe((bookingCancellationDetail: any) => {
            this.booking.boatDetail = boatdetail;
            this.booking.TotalDays = this.totalDays;
            this.booking.checkinDate = this.checkInDate;
            this.booking.checkoutDate = this.checkOutDate;
            this.boatDetail = boatdetail;
            this.booking.bookingCancelDetail = bookingCancellationDetail?.data;


          });

        });





      }

    });

  }
  isCheckinStarted(checkinDate: Date, checkinTime: Date) {
    let inDate = moment(checkinDate).format("DD-MM-YYYY");
    let currentDate = moment().format("DD-MM-YYYY");
    let inTime = moment(checkinTime).format("HH:mm");
    let curretTime = moment().format("HH:mm");
    if (checkinDate != undefined && checkinTime != undefined) {return (inDate == currentDate && inTime > curretTime)?true:(moment(checkinDate).isAfter(moment().format("YYYY-MM-DD")))?true:false;}
    else{return false;}
  }
  isCheckoutTimeEnd(checkoutDate:Date,checkoutTime:string){
    let outDate = moment(checkoutDate).format("DD-MM-YYYY");
    let currentDate = moment().format("DD-MM-YYYY");
    let currenDateYearMonthDay = moment().format("YYYY-MM-DD");
    let curretTime = moment().format("hh:mm a");
    if (checkoutDate != undefined && checkoutTime != undefined) {
     return (moment(currenDateYearMonthDay).isAfter(checkoutDate))?true: (outDate == currentDate && curretTime > checkoutTime) ? true:false;
    }
    else{
      return false;
    }
  }
  changeStatus(isAccepted: boolean) {
    if (isAccepted) {
      let modal = this.modal.open(ConfirmDialogComponent, { centered: true, windowClass: 'custom-modal custom-small-modal' });
      modal.componentInstance.message = 'Are your sure.You want to accept this reservation?'
      modal.componentInstance.onClose.subscribe((res: boolean) => {
        if (res) {
        this.reservationStatusChange(this.bookingId, isAccepted, '');
          modal.dismiss();
        }
        else {
          modal.dismiss();
        }
      })
    }
    else {
      let modal = this.modal.open(RejectionModalComponent, { centered: true, windowClass: 'custom-modal custom-small-modal' });
      modal.componentInstance.onSave.subscribe((reason: string) => {
        this.reservationStatusChange(this.bookingId, isAccepted, reason);
        modal.dismiss();
      })
    }

  }
  reservationStatusChange(id: number, isAccepted: boolean, reason: string) {
    this.reservationService.changeStatus(id, isAccepted, reason, 1).subscribe((res:any) => {
      isAccepted ? this.toastr.success('Request accepted successfully.', 'Success') : this.toastr.success('Request rejected successfully.', 'Success');
      this.route.navigate(['host/my-bookings']);
    });
  }

  getRefundDetails(){
    this.service.getBookingCancellationDetail(this.bookingId).subscribe((res:any)=>{
      if(res?.data?.length > 0){
        this.cancelledBookingDetails = res?.data[0];
      }
    })
  }
}




