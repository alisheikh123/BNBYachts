import { BookingType } from './../../../shared/enums/booking.constants';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookingService } from 'src/app/core/Booking/booking.service';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { BookingResponseFilter, BookingStatus, ServiceType } from 'src/app/shared/enums/booking.constants';
import { BookingListingService } from 'src/app/core/Booking/booking-listing.service';
import { YachtSearchService } from 'src/app/core/yacht-search/yacht-search.service';
import * as moment from 'moment';


@Component({
  selector: 'app-all-reservations',
  templateUrl: './all-reservations.component.html',
  styleUrls: ['./all-reservations.component.scss'],
  providers: [NgbRatingConfig]
})
export class AllReservationsComponent implements OnInit {
  public dateValue: Object = new Date();
  booking: any;
  allBookings: any;
  userCharters: any;
  userEvents: any;
  listingFilter =
  {
    modelDate :"",
    selectedYear: "",
    selectedMonth:"",
    BOOKING_STATUS:BookingStatus,
    BOOKING_FILTER: BookingResponseFilter,
    selectedStatusFilter: BookingStatus.ChooseFilter,
    selectedTabStatus: BookingResponseFilter.ChooseFilter,
    activeTab:0,
    currentReservationStatus:4,
    selectedServiceType:1,
    selectedBookingStatus:0
  };
  queryParams = {
    page: 1,
    pageSize: 5
  };
  assetsUrl = environment.S3BUCKET_URL + '/boatGallery/';
  bookedServicesTypes = {
    boatel: 1,
    charter: 2,
    event: 3
  };
  getBookingObject =
  {
    filter:4,
    bookingType:0,
    month:"",
    pageNo:0,
    pageSize:0,
    year:"",
    userId:"",
    totalRecords:0
  };
  constructor(private service: BookingListingService, private boatService: YachtSearchService, config: NgbRatingConfig) {
    config.max = 5;
    config.readonly = true;
  }

  ngOnInit(): void {
  this.getReservations();
  }
  getReservations() {
    let bookingObject = this.assignValuetoObject();
    if (this.listingFilter.selectedServiceType == this.bookedServicesTypes.boatel) {
      this.service.getBookings(bookingObject).subscribe((res: any) => {
          this.allBookings = res?.data;
          this.getBookingObject.totalRecords = res?.totalCount;
          this.boatelStatusFilter(this.listingFilter.currentReservationStatus);
        });
    }
    if (this.listingFilter.selectedServiceType == this.bookedServicesTypes.charter) {
      this.service.getCharterBookings(bookingObject).subscribe((res: any) => {
          this.userCharters = res?.data;
          this.getBookingObject.totalRecords = res?.totalCount;
          this.charterStatusFilter(this.listingFilter.currentReservationStatus);
        });

    }
    if (this.listingFilter.selectedServiceType == this.bookedServicesTypes.event) {
      this.service.getEventBookings(bookingObject).subscribe((res: any) => {
          this.userEvents = res?.data;
          this.getBookingObject.totalRecords = res?.totalCount;
          this.eventStatusFilter(this.listingFilter.currentReservationStatus);
        });
    }


  }
  boatelStatusFilter(status: Number) {
    this.booking = (status != null && status != this.listingFilter.BOOKING_STATUS.ChooseFilter) ? this.allBookings.filter((res: any) => res.bookingStatus == status) : this.allBookings;
    this.booking.forEach((elem: any) => {
      this.boatService.boatDetailsById(elem.boatId).subscribe((boatdetail: any) => {
        elem.boatDetail = boatdetail;
      });
    });
  }
  charterStatusFilter(status: number) {
    this.userCharters = (status != null && status != this.listingFilter.BOOKING_STATUS.ChooseFilter) ? this.userCharters.filter((res: any) => res.bookingStatus == status) : this.userCharters;
    this.userCharters.forEach((elem: any) => {
      this.boatService.charterDetailsById(elem.charterId).subscribe((charterdetail: any) => {
        elem.charterDetail = charterdetail?.charterDetails;
        this.boatService.boatDetailsById(elem.charterDetail?.boatId).subscribe((boatdetails: any) => {
          elem.boatDetail = boatdetails;
        })
      });
    });
  }
  eventStatusFilter(status: number) {
    this.userEvents = (status != null && status != this.listingFilter.BOOKING_STATUS.ChooseFilter) ? this.userEvents.filter((res: any) => res.bookingStatus == status) : this.userEvents;
    this.userEvents.forEach((elem: any) => {
      this.boatService.eventDetailsById(elem.eventId).subscribe((eventdetail: any) => {
        elem.eventDetail = eventdetail?.eventDetails;
        this.boatService.boatDetailsById(elem.eventDetail?.boatId).subscribe((boatdetails:any)=>{
          elem.boatDetail = boatdetails;
        })
      });
    });
  }
  applyDateFilter(data: any) {
    const stringToSplit = this.listingFilter.modelDate;
    let result = stringToSplit.split('-');
    this.listingFilter.selectedYear = moment(data?.value).format("YYYY");
    this.listingFilter.selectedMonth = moment(data?.value).format("MM");

  }
  selectedbookingStatusFilter(selectedItem: number) {
    this.listingFilter.selectedBookingStatus = selectedItem;
    this.getReservations();
  }
  filterServiceType(serviceType: number) {
    this.listingFilter.selectedServiceType = serviceType;
    this.getReservations();
  }
  onPageChange(data: any) {
    this.queryParams.page = data.page;
    this.getReservations();
  }
  onPageSizeChange(data: any) {
    this.queryParams.page = 1;
    this.queryParams.pageSize = data.pageSize;
    this.getReservations();
  }
  selectedReservationStatus(selectedItem:any) {
    this.listingFilter.currentReservationStatus = selectedItem.reserStatus;
    this.listingFilter.selectedServiceType = selectedItem.reservationtype;
    this.getReservations();
  }
  selectedReservationTime(selectedTime:any)
  {
    this.listingFilter.selectedServiceType = selectedTime.reservationtype;
    this.listingFilter.selectedBookingStatus = selectedTime.reserTime;
    this.getReservations();

  }
  selectedDuration(selectedDuration:any)
  {
    this.listingFilter.selectedServiceType = selectedDuration.reservationtype;
    this.listingFilter.selectedMonth = selectedDuration.month;
    this.listingFilter.selectedYear = selectedDuration.year;
    this.getReservations();
  }
  assignValuetoObject()
  {
    this.listingFilter.currentReservationStatus = this.listingFilter.currentReservationStatus==BookingStatus.ChooseFilter?BookingStatus.ChooseFilter:this.listingFilter.currentReservationStatus;
    this.getBookingObject.month = this.listingFilter.selectedMonth;
    this.getBookingObject.year = this.listingFilter.selectedYear;
    this.getBookingObject.pageNo = this.queryParams.page;
    this.getBookingObject.pageSize =this.queryParams.pageSize;
    this.getBookingObject.bookingType = this.listingFilter.selectedServiceType==this.bookedServicesTypes.boatel ?this.bookedServicesTypes.boatel:this.listingFilter.selectedServiceType;
    this.getBookingObject.filter = this.listingFilter.selectedBookingStatus==this.listingFilter.BOOKING_FILTER.ChooseFilter?this.listingFilter.BOOKING_FILTER.All:this.listingFilter.selectedBookingStatus;
    return this.getBookingObject;
  }
}
