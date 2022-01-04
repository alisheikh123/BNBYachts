
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookingService } from 'src/app/core/Booking/booking.service';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { BookingResponseFilter, BookingStatus, BookingType, ServiceType } from 'src/app/shared/enums/booking.constants';
import { BookingListingService } from 'src/app/core/Booking/booking-listing.service';
import { YachtSearchService } from 'src/app/core/yacht-search/yacht-search.service';
import * as moment from 'moment';

@Component({
  selector: 'app-boat-reservation-listing',
  templateUrl: './boat-reservation-listing.component.html',
  styleUrls: ['./boat-reservation-listing.component.scss'],
  providers: [NgbRatingConfig]
})
export class BoatReservationListingComponent implements OnInit {
  month = [{ name: "chooose your month", Id: "0", selected: true }, { name: "January", Id: "1", }, { name: "February", Id: "2", }, { name: "March", Id: "3", }, { name: "April", Id: "4", }, { name: "May", Id: "5", }, { name: "June", Id: "6", }, { name: "July", Id: "7", }, { name: "August", Id: "8", }, { name: "September", Id: "9", }, { name: "October", Id: "10", }, { name: "November", Id: "11", }, { name: "December", Id: "12", },];
  monthName: any;
  booking: any;
  allBookings: any;
  monthSelect: any
  reservationForm: FormGroup;
  userId: string;
  boatbookingDetail: any;
  currentMonth: any;
  isRecordNotFound: boolean;
  assetsUrl = environment.S3BUCKET_URL + '/boatGallery/';
  date: any;
  selectedYear: string = "";
  selectedMonth: string = "";
  modelDate = "";
  BOOKING_STATUS = BookingStatus;
  RESERVATION_STATUS = BookingType;
  selectedStatusFilter: any = this.BOOKING_STATUS.ChooseFilter;
  selectedReservationStatus:any = BookingType.Boatels;
  BOOKING_FILTER = BookingResponseFilter;
  selectedTab: number = this.BOOKING_FILTER.ChooseFilter;
  selectedReservationTab: any = this.RESERVATION_STATUS.Boatels;
  selectedTabStatus: number = this.BOOKING_FILTER.ChooseFilter;
  public dateValue: Object = new Date();
  queryParams = {
    page: 1,
    pageSize: 5
  };
  activeTab = 0;
  totalRecords: number = 0;
  constructor(private service: BookingListingService, private boatService: YachtSearchService, config: NgbRatingConfig) {
    config.max = 5;
    config.readonly = true;
  }

  ngOnInit(): void {
    this.getReservations();
  }

  getReservations() {
    this.selectedTabStatus = this.selectedTab;
    let tab = this.selectedTab == this.BOOKING_FILTER.ChooseFilter ? this.BOOKING_FILTER.All : this.selectedTab;
    let reservationTab = this.selectedReservationTab == this.RESERVATION_STATUS.Boatels ? this.RESERVATION_STATUS.Boatels : this.selectedReservationTab;
    this.service.getBookings(tab,reservationTab, this.selectedMonth,
       this.selectedYear,this.queryParams.page,this.queryParams.pageSize).subscribe((res: any) => {
      this.allBookings = res?.data;
      this.totalRecords = res?.totalCount;
      this.statusFilter(this.selectedStatusFilter);
    });
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
  reservationStatusFilter(reserveStatus:any)
  {
    debugger;
    this.selectedReservationStatus = reserveStatus;
    let tab = this.selectedTab == this.BOOKING_FILTER.ChooseFilter ? this.BOOKING_FILTER.All : this.selectedTab;
    if(reserveStatus==BookingType.Boatels)
    {
      this.service.getBookings(tab,reserveStatus, this.selectedMonth,
       this.selectedYear,this.queryParams.page,this.queryParams.pageSize).subscribe((res: any) => {
        this.allBookings = res?.data;
        this.totalRecords = res?.totalCount;
      });
    }
    if(reserveStatus==BookingType.Charters)
    {
      this.service.getCharterBookings(tab,reserveStatus, this.selectedMonth,
        this.selectedYear,this.queryParams.page,this.queryParams.pageSize).subscribe((res: any) => {
         this.allBookings = res?.data;
         this.totalRecords = res?.totalCount;
       });
    }
    if(reserveStatus==BookingType.Events)
    {

      this.service.getEventBookings(tab,reserveStatus, this.selectedMonth,
        this.selectedYear,this.queryParams.page,this.queryParams.pageSize).subscribe((res: any) => {
         this.allBookings = res?.data;
         this.totalRecords = res?.totalCount;
       });
    }


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
  applyDateFilter(data:any) {
    const stringToSplit = this.modelDate;
    let result = stringToSplit.split('-');
    this.selectedYear = moment(data?.value).format("YYYY");
    this.selectedMonth =  moment(data?.value).format("MM");
    this.getReservations();
    //(this.selectedTab == this.BOOKING_FILTER.Upcomings) ? this.getReservations() : (this.selectedTab == this.BOOKING_FILTER.Past) ? this.getReservations(this.BOOKING_FILTER.Past) : this.getReservations(this.BOOKING_FILTER.All);
  }
}
