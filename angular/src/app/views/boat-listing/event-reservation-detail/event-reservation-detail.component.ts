
import { EventTypes } from 'src/app/shared/enums/yacht-search.constant';
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
import { IEventReservation } from 'src/app/shared/interface/reservation';

@Component({
  selector: 'app-event-reservation-detail',
  templateUrl: './event-reservation-detail.component.html',
  styleUrls: ['./event-reservation-detail.component.scss']
})
export class EventReservationDetailComponent implements OnInit {
  eventReservation: IEventReservation =
    {
      checkoutTime: '',
      eventBookingId: 0,
      isPosted: false,
      isHost: false
    };
  filters = {
    BOOKING_STATUS: BookingStatus,
    USER_ROLES: UserRoles,
    today: new Date().toLocaleDateString(),
    checkedStartDate: Date(),
    checkinTimeValidation: Date(),
    EVENT_TYPE: EventTypes.Adults
  };
  eventBooking: any;
  assetsUrl = environment.S3BUCKET_URL + '/boatGallery/';
  @ViewChild(ListReviewsComponent) listReviewComponent: ListReviewsComponent;
  constructor(private service: BookingService
    , private boatService: YachtSearchService,
    public activatedRoute: ActivatedRoute, private route: Router,
    private modal: NgbModal, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(res => {
      this.eventReservation.eventBookingId = Number(res['id']);
    });
    var userRole = localStorage.getItem('userRole');
    userRole == this.filters.USER_ROLES.host
      ? (this.eventReservation.isHost = true)
      : (this.eventReservation.isHost = false);
    this.boatService.eventDetailsById(this.eventReservation.eventBookingId).subscribe((res: any) => {
      this.eventBooking = res?.eventDetails;
      this.filters.checkedStartDate = new Date(this.eventBooking?.startDate).toLocaleDateString();
      this.eventBooking.startDate = new Date(this.eventBooking?.startDateTime);
      this.eventBooking.endDate = new Date(this.eventBooking?.endDateTime);
      this.eventReservation.checkoutTime = this.eventBooking?.boat?.checkoutTime;
      this.filters.checkinTimeValidation = this.eventBooking?.boat?.checkinTime;

    });
    this.isReviewPosted();
  }
  addReview() {
    this.modal.open(AddReviewModalComponent, { windowClass: 'custom-modal custom-small-modal', centered: true }).componentInstance.onSave.subscribe((res: any) => {
      let review = {
        revieweeID : this.eventBooking?.hostId,
        boatId: this.eventBooking?.boatId,
        bookingId: this.eventReservation.eventBookingId,
        reviewDescription: res.reviewText,
        ratings: res.ratingStars
      };
      this.service.addReview(review).subscribe(res => {
        if (res) {
          this.modal.dismissAll();
          this.toastr.success("Review Added Successfully", "Review");
          this.eventReservation.isPosted = true;
          this.listReviewComponent.getReviews();
        }
      });
    });
  }
  isReviewPosted() {
    this.service.isReviewPosted(this.eventReservation.eventBookingId).subscribe((res: any) => {
      this.eventReservation.isPosted = res;
    });
  }
  isBookingPassed(): boolean {
    let parsedDate = Date.parse(this.eventReservation.checkoutTime);
    let today = Date.parse(new Date().toISOString());
    return (today > parsedDate) ? true : false;
  }

  goBack() {
    this.eventReservation.isHost == true ? this.route.navigate(['host/my-bookings']) : this.route.navigate(['boat-listing/all-reservations']);
  }
  isEventStarted(startDate: Date, checkinTime: Date) {
    let inDate = moment(startDate).format("DD-MM-YYYY");
    let currentDate = moment().format("DD-MM-YYYY");
    let inTime = moment(checkinTime).format("HH:mm");
    let curretTime = moment().format("HH:mm");
    if (startDate != undefined && checkinTime != undefined) {
      return (inDate == currentDate && inTime > curretTime) ? true : moment(startDate).isAfter(moment().format("YYYY-MM-DD")) ? true : false;
    }
    return false;
  }
  isEndDateEnded(endDate: Date, checkoutTime: Date) {
    let outDate = moment(endDate).format("DD-MM-YYYY");
    let currentDate = moment().format("DD-MM-YYYY");
    let outTime = moment(checkoutTime).format("HH:mm");
    let curretTime = moment().format("HH:mm");
    if (endDate != undefined && checkoutTime != undefined) {
      return (outDate == currentDate && curretTime > outTime) ? true : moment(endDate).isAfter(moment().format("YYYY-MM-DD")) ? true : false;
    }
    else {
      return false;
    }
  }

}
