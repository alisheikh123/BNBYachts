import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookingService } from 'src/app/core/Booking/booking.service';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { BookingResponseFilter, BookingStatus } from 'src/app/shared/enums/booking.constants';
import { BookingListingService } from 'src/app/core/Booking/booking-listing.service';
import { YachtSearchService } from 'src/app/core/yacht-search/yacht-search.service';


@Component({
  selector: 'app-all-reservations',
  templateUrl: './all-reservations.component.html',
  styleUrls: ['./all-reservations.component.scss'],
  providers: [NgbRatingConfig]
})
export class AllReservationsComponent implements OnInit {
  month = [{ name: "chooose your month", Id: "0", selected: true }, { name: "January", Id: "1", }, { name: "February", Id: "2", }, { name: "March", Id: "3", }, { name: "April", Id: "4", }, { name: "May", Id: "5", }, { name: "June", Id: "6", }, { name: "July", Id: "7", }, { name: "August", Id: "8", }, { name: "September", Id: "9", }, { name: "October", Id: "10", }, { name: "November", Id: "11", }, { name: "December", Id: "12", },];
  monthName: any;
  booking: any;
  allBoolings: any;
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
  selectedStatusFilter: any = null;
  BOOKING_FILTER = BookingResponseFilter;
  selectedTab: number = this.BOOKING_FILTER.All;
  constructor(private fb: FormBuilder, private service: BookingListingService, private boatService: YachtSearchService, config: NgbRatingConfig) {
    config.max = 5;
    config.readonly = true;
  }

  ngOnInit(): void {
    this.getReservations(this.BOOKING_FILTER.All);
  }

  getReservations(tab: number) {
    this.service.getBookings(tab, this.selectedMonth, this.selectedYear).subscribe((res: any) => {
      this.allBoolings = res;
      this.statusFilter(this.selectedStatusFilter);
    });
  }

  applyDateFilter() {
    const stringToSplit = this.modelDate;
    let result = stringToSplit.split('-');
    this.selectedYear = result[0];
    this.selectedMonth = result[1];
    (this.selectedTab == this.BOOKING_FILTER.Upcomings) ? this.getReservations(this.BOOKING_FILTER.Upcomings) : (this.selectedTab == this.BOOKING_FILTER.Past) ? this.getReservations(this.BOOKING_FILTER.Past) : this.getReservations(this.BOOKING_FILTER.All);
  }

  statusFilter(status: any) {
    this.selectedStatusFilter = status;
    this.booking = status != null ? this.allBoolings.filter((res: any) => res.bookingStatus == status) : this.allBoolings;
    this.booking.forEach((elem: any) => {
      this.boatService.boatDetailsById(elem.boatId).subscribe((boatdetail: any) => {
        elem.boatDetail = boatdetail;
      });
    });
  }
}
