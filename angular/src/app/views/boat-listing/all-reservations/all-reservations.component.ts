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
  booking: any;
  allBookings: any;
  selectedYear: string = "";
  selectedMonth: string = "";
  modelDate = "";
  BOOKING_STATUS = BookingStatus;
  selectedStatusFilter: any = this.BOOKING_STATUS.ChooseFilter;
  BOOKING_FILTER = BookingResponseFilter;
  selectedTabStatus: number = this.BOOKING_FILTER.ChooseFilter;
  public dateValue: Object = new Date();
  activeTab = 0;
  currentReservationStatus: number= 0;
  selectedServiceType: number = 0;
  selectedBookingStatus:number=0;
  queryParams = {
    page: 1,
    pageSize: 5
  };
  totalRecords: number = 0;
  assetsUrl = environment.S3BUCKET_URL + '/boatGallery/';
  bookedServicesTypes = {
    boatel: 0,
    charter: 1,
    event: 2
  };
  getBookingObject =
  {
    filter:4,
    bookingType:0,
    month:"",
    pageNo:0,
    pageSize:0,
    year:"",
    userId:""
  };
  userCharters: any;
  userEvents: any;
  constructor(private service: BookingListingService, private boatService: YachtSearchService, config: NgbRatingConfig) {
    config.max = 5;
    config.readonly = true;
  }

  ngOnInit(): void {
    this.getReservations();
  }
  getReservations() {
    let bookingObject = this.assignValuetoObject();
    if (this.selectedServiceType == this.bookedServicesTypes.boatel) {
      this.service.getBookings(bookingObject).subscribe((res: any) => {
          this.allBookings = res?.data;
          this.totalRecords = res?.totalCount;
          this.boatelStatusFilter(this.currentReservationStatus);
        });
    }
    if (this.selectedServiceType == this.bookedServicesTypes.charter) {
      this.service.getCharterBookings(bookingObject).subscribe((res: any) => {
          this.userCharters = res?.data;
          this.totalRecords = res?.totalCount;
          this.charterStatusFilter(this.currentReservationStatus);
        });

    }
    if (this.selectedServiceType == this.bookedServicesTypes.event) {
      this.service.getEventBookings(bookingObject).subscribe((res: any) => {
          this.userEvents = res?.data;
          this.totalRecords = res?.totalCount;
          this.eventStatusFilter(this.currentReservationStatus);
        });
    }


  }
  boatelStatusFilter(status: Number) {
    this.booking = (status != null && status != this.BOOKING_STATUS.ChooseFilter) ? this.allBookings.filter((res: any) => res.bookingStatus == status) : this.allBookings;
    this.booking.forEach((elem: any) => {
      this.boatService.boatDetailsById(elem.boatId).subscribe((boatdetail: any) => {
        elem.boatDetail = boatdetail;
      });
    });
  }
  charterStatusFilter(status: number) {
    this.userCharters = (status != null && status != this.BOOKING_STATUS.ChooseFilter) ? this.userCharters.filter((res: any) => res.bookingStatus == status) : this.userCharters;
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
    this.userEvents = (status != null && status != this.BOOKING_STATUS.ChooseFilter) ? this.userEvents.filter((res: any) => res.bookingStatus == status) : this.userEvents;
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
    const stringToSplit = this.modelDate;
    let result = stringToSplit.split('-');
    this.selectedYear = moment(data?.value).format("YYYY");
    this.selectedMonth = moment(data?.value).format("MM");

  }
  selectedbookingStatusFilter(selectedItem: number) {
    this.selectedBookingStatus = selectedItem;
    this.getReservations();
  }
  filterServiceType(serviceType: number) {
    this.selectedServiceType = serviceType;
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
    this.currentReservationStatus = selectedItem.reserStatus;
    this.selectedServiceType = selectedItem.reservationtype;
    this.getReservations();
  }
  selectedReservationTime(selectedTime:any)
  {
    this.selectedServiceType = selectedTime.reservationtype;
    this.selectedBookingStatus = selectedTime.reserTime;
    this.getReservations();

  }
  selectedDuration(selectedDuration:any)
  {
    this.selectedServiceType = selectedDuration.reservationtype;
    this.selectedMonth = selectedDuration.month;
    this.selectedYear = selectedDuration.year;
    this.getReservations();
  }
  assignValuetoObject()
  {
    this.currentReservationStatus = this.currentReservationStatus==BookingStatus.ChooseFilter?BookingStatus.ChooseFilter:this.currentReservationStatus;
    this.getBookingObject.month = this.selectedMonth;
    this.getBookingObject.year = this.selectedYear;
    this.getBookingObject.pageNo = this.queryParams.page;
    this.getBookingObject.pageSize =this.queryParams.pageSize;
    this.getBookingObject.bookingType = this.selectedServiceType==this.bookedServicesTypes.boatel ?this.bookedServicesTypes.boatel:this.selectedServiceType;
    this.getBookingObject.filter = this.selectedBookingStatus==this.BOOKING_FILTER.ChooseFilter?this.BOOKING_FILTER.All:this.selectedBookingStatus;
    return this.getBookingObject;
  }
}
