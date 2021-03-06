import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { BookingListingService } from 'src/app/core/Booking/booking-listing.service';
import { BookingService } from 'src/app/core/Booking/booking.service';
import { YachtSearchService } from 'src/app/core/yacht-search/yacht-search.service';
import { BoatType } from 'src/app/shared/enums/boat-Type';
import { BookingStatus } from 'src/app/shared/enums/booking.constants';
import { UserRoles } from 'src/app/shared/enums/user-roles';
import { CharterBookingRequestable } from 'src/app/shared/interface/charter';
import { ICharterReservation } from 'src/app/shared/interface/reservation';
import { ServiceFee } from 'src/app/shared/interface/Service-fee';
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
      charterId: 0,
      bookingId: 0,
      isPosted: false,
      isHost: false
    };
  filters = {
    BOOKING_STATUS: BookingStatus,
    USER_ROLES: UserRoles,
    today: new Date().toLocaleDateString(),
    checkinTimeValidation: Date()
  };
  charterBookingCancelDetail:any;
  checkedDepartureFromDate: any;
  charterBooking: any;
  charterBookingStatus:any;
  assetsUrl = environment.S3BUCKET_URL + '/boatGallery/';
  isUserHost: boolean;
  @ViewChild(ListReviewsComponent) listReviewComponent: ListReviewsComponent;
  bookingDetail: CharterBookingRequestable= new CharterBookingRequestable();
  boatType = BoatType;
  serviceFee : ServiceFee;
  constructor(private service: BookingService
    , private boatService: YachtSearchService,
    public activatedRoute: ActivatedRoute,
     private route: Router,
    private modal: NgbModal,
     private toastr: ToastrService,
     private charterBookingService: BookingListingService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(res => {
      this.charterReservation.bookingId = Number(res['id']);
      this.charterReservation.charterId = Number(res['bookingId']);

    });
    var userRole = localStorage.getItem('userRole');
    userRole == this.filters.USER_ROLES.host
      ? (this.charterReservation.isHost = true)
      : (this.charterReservation.isHost = false);
    this.isUserHost = localStorage.getItem('userRole') == this.filters.USER_ROLES.host ? (this.charterReservation.isHost = true) : (this.charterReservation.isHost = false);
this.getServiceFeeByBoatType();
    this.boatService.charterDetailsById(this.charterReservation.bookingId).subscribe((res: any) => {
      this.charterBooking = res?.charterDetails;
      this.checkedDepartureFromDate = moment(this.charterBooking?.departureFromDate).format("YYYY-MM-DD hh:mm:ss a");
      let departingFromDate = moment(this.charterBooking?.departureFromDate).format('YYYY-MM-DD hh:mm:ss a');
      let departingToDate = moment(this.charterBooking?.departureToDate).format('YYYY-MM-DD hh:mm:ss a');
      this.charterBooking.totalDays = Math.round(moment.duration(moment(departingToDate).diff(departingFromDate)).asDays());
    });
    this.charterBookingService.getCharterBookingDetailById(this.charterReservation.charterId).subscribe((bookingDetail: CharterBookingRequestable) => {
      this.charterBookingStatus = bookingDetail?.bookingStatus;
      this.bookingDetail = bookingDetail;
      console.log(this.bookingDetail);
    });
    this.service.getBookingCancellationDetail(this.charterReservation.charterId).subscribe((eventBookingCancelDetail: any) => {
      this.charterBookingCancelDetail = eventBookingCancelDetail.data;
    });

    this.isReviewPosted();
  }
  getServiceFeeByBoatType() {
    this.boatService.getServiceFeeByBoatType(this.boatType.Charter).subscribe((res: any) => {
      this.serviceFee = res.data;
    });
  }
  getTotalGuests(): number {
    return this.bookingDetail?.noOfAdults + this.bookingDetail?.noOfChildrens;
  }
  basicCharges(): number {
    return this.charterBooking?.charterFee * this.getTotalGuests();
  }
  getTotal(): number {
    return this.charterBooking?.charterFee * this.bookingDetail?.noOfAdults + this.bookingDetail?.noOfChildrens + Number(this.serviceFee?.serviceFee) +
    this.charterBooking?.boat?.taxFee;
  }
  getBasicTotal():number{
    return this.charterBooking?.charterFee + Number(this.serviceFee?.serviceFee) +
    this.charterBooking?.boat?.taxFee;
  }
  deductedAmount(charterBooking:any){
    charterBooking?.totalAmount - charterBooking?.refundAmount
  }
  addReview() {
    this.modal.open(AddReviewModalComponent, { windowClass: 'custom-modal custom-small-modal', centered: true }).componentInstance.onSave.subscribe((res: any) => {
      let review = {
        revieweeID: this.charterBooking?.hostId,
        boatId: this.charterBooking?.boatId,
        bookingId: this.charterReservation.charterId,
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
    this.service.isReviewPosted(this.charterReservation.charterId).subscribe((res: any) => {
      this.charterReservation.isPosted = res;
    });
  }
  isBookingPassed(): boolean {
    let arrivalTime = moment(this.charterBooking.departureToDate).format("HH:mm a");
    let parsedDate = Date.parse(arrivalTime);
    let today = Date.parse(new Date().toISOString());
    return (today > parsedDate) ? true : false;
  }

  goBack() {
    this.charterReservation.isHost == true ? this.route.navigate(['host/my-bookings']) : this.route.navigate(['boat-listing/all-reservations']);
  }

  isDepartureFromStarted(departureFromDate: string) {
    let departureDate = moment(departureFromDate).format("DD-MM-YYYY");
    let departureTime = moment(departureFromDate).format("hh:mm");
    let currentDate = moment().format("DD-MM-YYYY");
    let curretTime = moment().format("hh:mm");
    if (departureFromDate != undefined && departureTime != undefined)
      return (departureDate == currentDate && departureTime > curretTime) ? true : moment(departureFromDate, "YYYY-MM-DD").isAfter(moment().format("YYYY-MM-DD")) ? true : false;
    else
      return false;


  }
  isDeparturetoTimeEnd(arrivalDateTime: Date) {
    // get date and Time of arrival date
    let arrivalDate = moment(arrivalDateTime).format("DD-MM-YYYY");
    let arrivalTime = moment(arrivalDateTime).format("HH:mm a");
    let currentDate = moment().format("DD-MM-YYYY");
    let curretTime = moment().format("HH:mm a");
    if (arrivalDateTime != undefined && arrivalTime != undefined)
      return moment(currentDate).isAfter(arrivalDate) ? true:(arrivalDate == currentDate && curretTime > arrivalTime) ? true : false;
    else
      return false;
  }

}
