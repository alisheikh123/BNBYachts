import { Component, OnInit } from '@angular/core';
import { BookingListingService } from 'src/app/core/Booking/booking-listing.service';
import { YachtSearchService } from 'src/app/core/yacht-search/yacht-search.service';
import { BookingResponseFilter, BookingStatus, BookingType } from 'src/app/shared/enums/booking.constants';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { Output, EventEmitter } from '@angular/core';

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
   activeTab = 0;
   RESERVATION_STATUS = BookingType;
  selectedReservationStatus:any = BookingType.Boatels;
  @Output() reservationStatus = new EventEmitter<number>();
  @Output() reservationTimeStatus = new EventEmitter<number>();
   constructor(private service: BookingListingService, private boatService: YachtSearchService, config: NgbRatingConfig) {
  }

  ngOnInit(): void {
  }
  selectReservationStatus(value: number) {
    this.reservationStatus.emit(value);
  }
  selectReservationTimeStatus(value: number) {
    this.reservationTimeStatus.emit(value);
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
  // reservationStatusFilter(reserveStatus:any)
  // {
  //   this.selectedReservationStatus = reserveStatus;
  //   let tab = this.selectedTab == this.BOOKING_FILTER.ChooseFilter ? this.BOOKING_FILTER.All : this.selectedTab;
  //   if(reserveStatus==BookingType.Boatels)
  //   {
  //     this.service.getBookings(tab,reserveStatus, this.selectedMonth,
  //      this.selectedYear,this.queryParams.page,this.queryParams.pageSize).subscribe((res: any) => {
  //       this.allBookings = res?.data;
  //       this.totalRecords = res?.totalCount;
  //     });
  //   }
  //   if(reserveStatus==BookingType.Charters)
  //   {
  //     this.service.getCharterBookings(tab,reserveStatus, this.selectedMonth,
  //       this.selectedYear,this.queryParams.page,this.queryParams.pageSize).subscribe((res: any) => {
  //        this.allBookings = res?.data;
  //        this.totalRecords = res?.totalCount;
  //      });
  //   }
  //   if(reserveStatus==BookingType.Events)
  //   {

  //     this.service.getEventBookings(tab,reserveStatus, this.selectedMonth,
  //       this.selectedYear,this.queryParams.page,this.queryParams.pageSize).subscribe((res: any) => {
  //        this.allBookings = res?.data;
  //        this.totalRecords = res?.totalCount;
  //      });
  //   }


  // }
  onPageChange(data: any) {
    this.queryParams.page = data.page;
    // this.getReservations();
  }
  onPageSizeChange(data: any) {
    this.queryParams.page = 1;
    this.queryParams.pageSize = data.pageSize;
    // this.getReservations();
  }
  applyDateFilter(data:any) {
    const stringToSplit = this.modelDate;
    let result = stringToSplit.split('-');
    this.selectedYear = moment(data?.value).format("YYYY");
    this.selectedMonth =  moment(data?.value).format("MM");
    // this.getReservations();
    //(this.selectedTab == this.BOOKING_FILTER.Upcomings) ? this.getReservations() : (this.selectedTab == this.BOOKING_FILTER.Past) ? this.getReservations(this.BOOKING_FILTER.Past) : this.getReservations(this.BOOKING_FILTER.All);
  }

}
