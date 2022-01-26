import { Component, OnInit, EventEmitter } from '@angular/core';
import { BookingListingService } from 'src/app/core/Booking/booking-listing.service';
import { YachtSearchService } from 'src/app/core/yacht-search/yacht-search.service';
import { BookingResponseFilter, BookingStatus, BookingType } from 'src/app/shared/enums/booking.constants';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { Output } from '@angular/core';

@Component({
  selector: 'app-booking-filter',
  templateUrl: './booking-filter.component.html',
  styleUrls: ['./booking-filter.component.scss']
})
export class BookingFilterComponent implements OnInit {
  booking: any;
  allBookings: any;
  selectedYear: string = "";
  selectedMonth: string = "";
  modelDate = "";
  BOOKING_STATUS = BookingStatus;
  selectedStatusFilter: any = this.BOOKING_STATUS.ChooseFilter;
  BOOKING_FILTER = BookingResponseFilter;
  selectedTab: number = this.BOOKING_FILTER.ChooseFilter;
  selectedTabStatus: number = this.BOOKING_FILTER.ChooseFilter;
  public dateValue: Object = new Date();
  queryParams = {
    page: 1,
    pageSize: 5
  };
  reservationStatusType = {
    reservationtype:0,
    reserStatus:0
  };
  reservationTime = {
    reservationtype:0,
    reserTime:0
  };
  durationFilter = {
    reservationtype:0,
    year:"",
    month:""
  };
   activeTab = 0;
   RESERVATION_STATUS = BookingType;
  selectedReservationStatus:any = BookingType.Boatels;
  selectedServiceType: number = 1;
  selectedReservationsStatus:number = BookingStatus.ChooseFilter;
  @Output() reservationStatus = new EventEmitter<any>();
  @Output() reservationTimeStatus = new EventEmitter<any>();
  @Output() bookingType = new EventEmitter<number>();
  @Output() DurationFilter = new EventEmitter<any>();
   constructor(private service: BookingListingService, private boatService: YachtSearchService, config: NgbRatingConfig) {
  }

  ngOnInit(): void {
  }
  selectReservationStatus(value: number) {
    this.selectedStatusFilter = value;
    this.reservationStatusType.reservationtype = this.selectedServiceType;
    this.reservationStatusType.reserStatus = value;
    this.reservationStatus.emit(this.reservationStatusType);
  }
  selectReservationTimeStatus(value: number) {
    this.selectedTabStatus = value;
    this.reservationTime.reservationtype = this.selectedServiceType;
    this.reservationTime.reserTime = value;
    this.reservationTimeStatus.emit(this.reservationTime);
  }
  statusFilter(status: any) {
    this.selectedStatusFilter = status;
    this.booking = (status != null && status != this.BOOKING_STATUS.ChooseFilter) ? this.allBookings.filter((res: any) => res.bookingStatus == status) : this.allBookings;
    this.booking.forEach((elem: any) => {
      this.boatService.boatDetailsById(elem.boatId).subscribe((boatdetail: any) => {
        elem.boatDetail = boatdetail;
      });
    });
  }

  onPageChange(data: any) {
    this.queryParams.page = data.page;
  }
  onPageSizeChange(data: any) {
    this.queryParams.page = 1;
    this.queryParams.pageSize = data.pageSize;
  }
  applyDateFilter(data:any) {
    const stringToSplit = this.modelDate;
    let result = stringToSplit.split('-');
    this.selectedYear = moment(data?.value).format("YYYY");
    this.selectedMonth =  moment(data?.value).format("MM");
    this.durationFilter.month = this.selectedMonth;
    this.durationFilter.year = this.selectedYear;
    this.durationFilter.reservationtype = this.selectedServiceType;
    this.DurationFilter.emit(this.durationFilter);

  }
  filterServiceType(serviceType: number) {
    this.selectedServiceType = serviceType;
    this.bookingType.emit(serviceType);
  }
}
