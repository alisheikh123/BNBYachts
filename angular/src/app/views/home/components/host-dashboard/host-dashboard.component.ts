import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { BookingListingService } from 'src/app/core/Booking/booking-listing.service';
import { BookingService } from 'src/app/core/Booking/booking.service';
import { YachtSearchService } from 'src/app/core/yacht-search/yacht-search.service';
import { BookingResponseFilter, BookingStatus, BookingType } from 'src/app/shared/enums/booking.constants';

@Component({
  selector: 'app-host-dashboard',
  templateUrl: './host-dashboard.component.html',
  styleUrls: ['./host-dashboard.component.scss']
})
export class HostDashboardComponent implements OnInit {
  upcomingBoatelReservations: any;
  upcomingCharterReservations: any;
  upcomingEventReservations: any;
  getBookingObject =
  {
    filter:BookingResponseFilter.All,
    bookingType:0,
    month:"",
    pageNo:1,
    pageSize:10,
    year:"",
    userId:"",
    totalRecords:0
  };
  listingFilter =
  {
    BOOKING_STATUS:BookingStatus,
    currentReservationStatus:BookingStatus.ChooseFilter
  };
  constructor(private service: BookingListingService, private boatService: YachtSearchService) { }

  ngOnInit(): void {
    this.getHostBoatelUpcomingReservation();
    this.getHostCharterUpcomingReservation();
    this.getHostEventUpcomingReservation();
  }
  getHostBoatelUpcomingReservation()
  {
    this.getBookingObject.month = moment().format('MM');
    this.getBookingObject.year = moment().format('YYYY');
    this.getBookingObject.bookingType = BookingType.Boatels;
    this.service.getHostUpcomingBoatelBooking(this.getBookingObject).subscribe((res: any) => {
      this.upcomingBoatelReservations = res?.data;
       this.boatelStatusFilter(this.listingFilter.currentReservationStatus);
    });
  }
  getHostCharterUpcomingReservation()
  {

    this.getBookingObject.month = moment().format('MM');
    this.getBookingObject.year = moment().format('YYYY');
    this.getBookingObject.bookingType = BookingType.Boatels;
    this.service.getHostUpcomingCharterBooking(this.getBookingObject).subscribe((res: any) => {
      this.upcomingCharterReservations = res?.data;
      this.upcomingCharterReservations?.forEach((elem: any) => {
      this.boatService.charterDetailsById(elem.charterId).subscribe((charterBookingDetail: any) =>
      {
        let charterDetails = elem.charterDetail = charterBookingDetail?.charterDetails;
        charterDetails?.forEach((elem2: any) => {
        this.boatService.boatDetailsById(elem2.boatId).subscribe((boatdetail: any) => {
        elem2.boatDetail = boatdetail;
          });

        });
      });
    });

    });
  }
  getHostEventUpcomingReservation()
  {
    this.getBookingObject.month = moment().format('MM');
    this.getBookingObject.year = moment().format('YYYY');
    this.getBookingObject.bookingType = BookingType.Boatels;
    this.service.getHostUpcomingEventBooking(this.getBookingObject).subscribe((res: any) => {
      this.upcomingEventReservations = res?.data;
      this.upcomingEventReservations?.forEach((elem: any) => {
      this.boatService.eventDetailsById(elem.eventId).subscribe((eventBookingDetail: any) =>
      {
        let evenDetail = elem.eventDetail;
        evenDetail = eventBookingDetail?.eventDetails;
        elem.eventDetail = eventBookingDetail?.eventDetails;
        evenDetail?.forEach((elem2: any) => {
        this.boatService.boatDetailsById(elem2.boatId).subscribe((boatdetail: any) => {
        elem2.boatDetail = boatdetail;
          });
        });
      });
    });
    });
  }
  boatelStatusFilter(status: Number) {
    let boatelBooking = (status != null && status != this.listingFilter.BOOKING_STATUS.ChooseFilter) ? this.upcomingBoatelReservations.filter((res: any) => res.bookingStatus == status) : this.upcomingBoatelReservations;
    boatelBooking?.forEach((elem: any) => {
      this.boatService.boatDetailsById(elem.boatId).subscribe((boatdetail: any) => {
        elem.boatDetail = boatdetail;
      });
    });
  }
}
