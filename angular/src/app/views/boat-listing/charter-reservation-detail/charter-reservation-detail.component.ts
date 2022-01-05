import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { BookingService } from 'src/app/core/Booking/booking.service';
import { YachtSearchService } from 'src/app/core/yacht-search/yacht-search.service';
import { BookingStatus } from 'src/app/shared/enums/booking.constants';
import { UserRoles } from 'src/app/shared/enums/user-roles';
import { environment } from 'src/environments/environment';
import { AddReviewModalComponent } from '../../common/add-review-modal/add-review-modal.component';
import { ListReviewsComponent } from '../../common/list-reviews/list-reviews.component';

@Component({
  selector: 'app-charter-reservation-detail',
  templateUrl: './charter-reservation-detail.component.html',
  styleUrls: ['./charter-reservation-detail.component.scss']
})
export class CharterReservationDetailComponent implements OnInit {
  charterBookingId: number;
  charterBooking: any;
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
  checkedDepartureFromDate: any;
  checkinTime: any;
  checkoutTime:any;
  assetsUrl = environment.S3BUCKET_URL + '/boatGallery/';
  @ViewChild(ListReviewsComponent) listReviewComponent: ListReviewsComponent;
  constructor(private service: BookingService
    ,private boatService: YachtSearchService,
    public activatedRoute: ActivatedRoute, private route: Router,
    private modal: NgbModal, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(res => {
      this.charterBookingId = Number(res['id']);
    });
    var userRole = localStorage.getItem('userRole');
    userRole == this.USER_ROLES.host
      ? (this.isHost = true)
      : (this.isHost = false);
    this.boatService.charterDetailsById(this.charterBookingId).subscribe((res: any) => {
      this.charterBooking = res?.charterDetails;
      this.currentDate = new Date();
      this.checkedDepartureFromDate = new Date(this.charterBooking?.departureFromDate).toLocaleDateString();
      this.charterBooking.departingFromDate = new Date(this.charterBooking?.departureFromDate);
      this.charterBooking.departingToDate = new Date(this.charterBooking?.departureToDate);
       this.charterBooking.totalDays = Math.ceil((this.charterBooking.departingToDate - this.charterBooking.departingFromDate) / 8.64e7) + 1;
       this.checkoutTime = this.charterBooking?.boat?.checkoutTime;

    });
     this.isReviewPosted();
  }
  addReview() {
    this.modal.open(AddReviewModalComponent, { windowClass: 'custom-modal custom-small-modal', centered: true }).componentInstance.onSave.subscribe((res: any) => {
      let review = {
        revieweeID: this.charterBooking?.boatId,
        bookingId: this.charterBookingId,
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
    this.service.isReviewPosted(this.charterBookingId).subscribe((res: any) => {
      this.isPosted = res;
    });
  }
  isBookingPassed(): boolean {
    let parsedDate = Date.parse(this.checkoutTime);
    let today = Date.parse(new Date().toISOString());
    return (today > parsedDate) ? true : false;
  }

  goBack() {
    this.isHost==true?this.route.navigate(['host/my-bookings']):this.route.navigate(['boat-listing/all-reservations']);
  }
  // isBookingStatusCancel(bookingId: number) {

  //   this.boatService.getBookingDetailbyId(bookingId).subscribe((res: any) => {
  //     this.bookingStatus = res?.bookingStatus;
  //     this.booking = res;
  //     this.currentDate = new Date();
  //     this.checkedCheckinDate = new Date(this.booking?.checkinDate).toLocaleDateString();
  //     this.checkInDate = new Date(this.booking?.checkinDate);
  //     this.checkOutDate = new Date(this.booking?.checkoutDate);
  //     this.totalDays = Math.ceil((this.checkOutDate - this.checkInDate) / 8.64e7) + 1;
  //     if (this.bookingStatus != this.BOOKING_STATUS.Cancel) {

  //       this.service.getBoatInfo(this.booking.boatId).subscribe((boatdetail: any) => {
  //         this.booking.boatDetail = boatdetail;
  //         this.booking.TotalDays = this.totalDays;
  //         this.booking.checkinDate = this.checkInDate;
  //         this.booking.checkoutDate = this.checkOutDate;
  //         this.boatDetail = boatdetail;
  //       });


  //     }
  //     else {
  //       this.service.getBoatInfo(this.booking.boatId).subscribe((boatdetail: any) => {
  //         this.service.getBookingCancellationDetail(this.booking?.id).subscribe((bookingCancellationDetail: any) => {
  //           this.booking.boatDetail = boatdetail;
  //           this.booking.TotalDays = this.totalDays;
  //           this.booking.checkinDate = this.checkInDate;
  //           this.booking.checkoutDate = this.checkOutDate;
  //           this.boatDetail = boatdetail;
  //           this.booking.bookingCancelDetail = bookingCancellationDetail?.data;


  //         });

  //       });





  //     }

  //   });

  // }
  isDepartureFromStarted(departureFromDate: Date, checkinTime: Date) {
    let inDate = moment(departureFromDate).format("DD-MM-YYYY");
    let currentDate = moment().format("DD-MM-YYYY");
    let inTime = moment(checkinTime).format("HH:mm");
    let curretTime = moment().format("HH:mm");
    if (departureFromDate != undefined && checkinTime != undefined) {
      return (inDate == currentDate && inTime > curretTime)?true:moment(departureFromDate).isAfter(moment().format("YYYY-MM-DD"))?true:false;
    }
    return false;


  }
  isDeparturetoTimeEnd(departureToDate:Date,checkoutTime:Date){
    let outDate = moment(departureToDate).format("DD-MM-YYYY");
    let currentDate = moment().format("DD-MM-YYYY");
    let outTime = moment(checkoutTime).format("HH:mm");
    let curretTime = moment().format("HH:mm");
    if (departureToDate != undefined && checkoutTime != undefined) {
    return  (outDate == currentDate && curretTime > outTime)?true:moment(departureToDate).isAfter(moment().format("YYYY-MM-DD"))?true:false;
    }
    else{
      return false;
    }
  }

}
