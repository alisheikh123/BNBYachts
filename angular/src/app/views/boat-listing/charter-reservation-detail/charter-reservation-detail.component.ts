import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { BookingService } from 'src/app/core/Booking/booking.service';
import { YachtSearchService } from 'src/app/core/yacht-search/yacht-search.service';
import { BookingStatus } from 'src/app/shared/enums/booking.constants';
import { UserRoles } from 'src/app/shared/enums/user-roles';
import { ICharterReservation } from 'src/app/shared/interface/reservation';
import { environment } from 'src/environments/environment';
import { AddReviewModalComponent } from '../../common/add-review-modal/add-review-modal.component';
import { ListReviewsComponent } from '../../common/list-reviews/list-reviews.component';

@Component({
  selector: 'app-charter-reservation-detail',
  templateUrl: './charter-reservation-detail.component.html',
  styleUrls: ['./charter-reservation-detail.component.scss']
})
export class CharterReservationDetailComponent implements OnInit {
  charterReservation: ICharterReservation =
  {
    checkoutTime: '',
    charterBookingId: 0,
    isPosted: false,
    isHost: false
  };
  filters = {
    BOOKING_STATUS: BookingStatus,
    USER_ROLES: UserRoles,
    today: new Date().toLocaleDateString(),
    checkinTimeValidation: Date()
  };
  checkedDepartureFromDate:any;
  charterBooking: any;
  assetsUrl = environment.S3BUCKET_URL + '/boatGallery/';
  @ViewChild(ListReviewsComponent) listReviewComponent: ListReviewsComponent;
  constructor(private service: BookingService
    ,private boatService: YachtSearchService,
    public activatedRoute: ActivatedRoute, private route: Router,
    private modal: NgbModal, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(res => {
      this.charterReservation.charterBookingId = Number(res['id']);
    });
    var userRole = localStorage.getItem('userRole');
    userRole == this.filters.USER_ROLES.host
      ? (this.charterReservation.isHost = true)
      : (this.charterReservation.isHost = false);
    this.boatService.charterDetailsById(this.charterReservation.charterBookingId).subscribe((res: any) => {
      this.charterBooking = res?.charterDetails;
      this.checkedDepartureFromDate = new Date(this.charterBooking?.departureFromDate).toLocaleDateString();
      let departingFromDate = moment(this.charterBooking?.departureFromDate, "YYYY-MM-DD");
      let departingToDate =   moment(this.charterBooking?.departureToDate, "YYYY-MM-DD");
       this.charterBooking.totalDays = departingToDate.diff(departingFromDate,'days') + 1;
       this.charterReservation.checkoutTime = this.charterBooking?.boat?.checkoutTime;

    });
     this.isReviewPosted();
  }
  addReview() {
    this.modal.open(AddReviewModalComponent, { windowClass: 'custom-modal custom-small-modal', centered: true }).componentInstance.onSave.subscribe((res: any) => {
      let review = {
        revieweeID: this.charterBooking?.boatId,
        bookingId: this.charterReservation.charterBookingId,
        reviewDescription: res.reviewText,
        ratings: res.ratingStars
      };
      this.service.addReview(review).subscribe(res => {
        if (res) {
          this.modal.dismissAll();
          this.toastr.success("Review Added Successfully", "Review");
          this.charterReservation.isPosted = true;
          this.listReviewComponent.getReviews();
        }
      });
    });
  }
  isReviewPosted() {
    this.service.isReviewPosted(this.charterReservation.charterBookingId).subscribe((res: any) => {
      this.charterReservation.isPosted = res;
    });
  }
  isBookingPassed(): boolean {
    let parsedDate = Date.parse(this.charterReservation.checkoutTime);
    let today = Date.parse(new Date().toISOString());
    return (today > parsedDate) ? true : false;
  }

  goBack() {
    this.charterReservation.isHost==true?this.route.navigate(['host/my-bookings']):this.route.navigate(['boat-listing/all-reservations']);
  }

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
