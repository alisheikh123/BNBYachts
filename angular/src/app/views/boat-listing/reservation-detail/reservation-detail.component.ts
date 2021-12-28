import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { BookingListingService } from 'src/app/core/Booking/booking-listing.service';
import { BookingService } from 'src/app/core/Booking/booking.service';
import { BookingStatus } from 'src/app/shared/enums/booking.constants';
import { UserRoles } from 'src/app/shared/enums/user-roles';
import { AddReviewModalComponent } from '../../common/add-review-modal/add-review-modal.component';
import { ListReviewsComponent } from '../../common/list-reviews/list-reviews.component';

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
  checkedCheckinDate: any;
  bookingStatus: number;
  @ViewChild(ListReviewsComponent) listReviewComponent: ListReviewsComponent;
  boatDetail: any;
  constructor(private service: BookingService
    , private bookingListService: BookingListingService,
    public activatedRoute: ActivatedRoute, private route: Router,
    private modal: NgbModal, private toastr: ToastrService) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(res => {
      this.bookingId = Number(res['id']);
    });
    //Check if Host
    var userRole = localStorage.getItem('userRole');
    userRole == this.USER_ROLES.host
      ? (this.isHost = true)
      : (this.isHost = false);
    this.isBookingStatusCancel(this.bookingId);
    this.isReviewPosted();
  }
  addReview() {
    this.modal.open(AddReviewModalComponent, { windowClass: 'custom-modal custom-small-modal', centered: true }).componentInstance.onSave.subscribe((res: any) => {
      let review = {
        revieweeID: this.booking?.boatId,
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
      this.checkedCheckinDate = new Date(this.booking?.checkinDate).toLocaleDateString();
      this.checkInDate = new Date(this.booking?.checkinDate);
      this.checkOutDate = new Date(this.booking?.checkoutDate);
      this.totalDays = Math.ceil((this.checkOutDate - this.checkInDate) / 8.64e7) + 1;
      if (this.bookingStatus != this.BOOKING_STATUS.Cancel)
      {

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
            this.service.getBookingCancellationDetail(this.booking?.id).subscribe((bookingCancellationDetail:any)=>{
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


}


