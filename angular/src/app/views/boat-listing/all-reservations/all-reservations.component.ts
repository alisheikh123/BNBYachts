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
  selectedTab: number = this.BOOKING_FILTER.ChooseFilter;
  selectedTabStatus: number = this.BOOKING_FILTER.ChooseFilter;
  public dateValue: Object = new Date();
   activeTab = 0;
  currentReservationStatus:number;
  constructor(private service: BookingListingService, private boatService: YachtSearchService, config: NgbRatingConfig) {

  }

  ngOnInit(): void {
  }
  applyDateFilter(data:any) {
    const stringToSplit = this.modelDate;
    let result = stringToSplit.split('-');
    this.selectedYear = moment(data?.value).format("YYYY");
    this.selectedMonth =  moment(data?.value).format("MM");
    // this.getReservations();
    //(this.selectedTab == this.BOOKING_FILTER.Upcomings) ? this.getReservations() : (this.selectedTab == this.BOOKING_FILTER.Past) ? this.getReservations(this.BOOKING_FILTER.Past) : this.getReservations(this.BOOKING_FILTER.All);
  }

  // statusFilter(status: any) {
  //   this.selectedStatusFilter = status;
  //   this.booking = (status != null && status != this.BOOKING_STATUS.ChooseFilter) ? this.allBookings.filter((res: any) => res.bookingStatus == status) : this.allBookings;
  //   this.booking.forEach((elem: any) => {
  //     this.boatService.boatDetailsById(elem.boatId).subscribe((boatdetail: any) => {
  //       elem.boatDetail = boatdetail;
  //     });
  //   });
  // }
  selectedReservationStatus(selectedItem:number)
  {
    this.currentReservationStatus = selectedItem;
  }
  selectedTimeStatus(selectedItem:number)
  {
  }
}
