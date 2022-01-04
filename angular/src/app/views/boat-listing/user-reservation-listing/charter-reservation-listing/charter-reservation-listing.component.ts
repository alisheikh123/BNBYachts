import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BookingListingService } from 'src/app/core/Booking/booking-listing.service';
import { YachtSearchService } from 'src/app/core/yacht-search/yacht-search.service';
import { BookingResponseFilter, BookingStatus, BookingType } from 'src/app/shared/enums/booking.constants';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-charter-reservation-listing',
  templateUrl: './charter-reservation-listing.component.html',
  styleUrls: ['./charter-reservation-listing.component.scss']
})
export class CharterReservationListingComponent implements OnInit {
  userCharters:any;
  assetsUrl = environment.S3BUCKET_URL + '/boatGallery/';
  queryParams = {
    page: 1,
    pageSize: 5
  };
  totalRecords: number = 0;
  RESERVATION_STATUS = BookingType;
  selectedTab: number =BookingType.Charters;
  selectedReservationTab: any = this.RESERVATION_STATUS.Charters;
  BOOKING_FILTER = BookingResponseFilter;
  selectedYear: string = "";
  selectedMonth: string = "";
  BOOKING_STATUS = BookingStatus;
  selectedStatusFilter: any = this.BOOKING_STATUS.ChooseFilter;
  booking: any;
  constructor(private service: BookingListingService, private toastr: ToastrService, private boatService: YachtSearchService) { }

  ngOnInit(): void {
    this.getUserCharters();

  }
  getUserCharters(){
    this.selectedTab = this.selectedReservationTab;
    let tab = this.selectedTab == this.BOOKING_FILTER.ChooseFilter ? this.BOOKING_FILTER.All : this.selectedTab;
    this.service.getCharterBookings(tab,this.selectedTab, this.selectedMonth,
      this.selectedYear,this.queryParams.page,this.queryParams.pageSize).subscribe((res: any) => {
       this.userCharters = res?.data;
       this.totalRecords = res?.totalCount;
       this.statusFilter(this.selectedStatusFilter);
     });
  }
  statusFilter(status: any) {
    this.selectedStatusFilter = status;
    this.booking = (status != null && status != this.BOOKING_STATUS.ChooseFilter) ? this.userCharters.filter((res: any) => res.bookingStatus == status) : this.userCharters;
    this.booking.forEach((elem: any) => {
      this.boatService.charterDetailsById(elem.charterId).subscribe((charterdetail: any) => {
        elem.charterDetail = charterdetail?.charterDetails;
        this.boatService.boatDetailsById(elem.charterDetail?.boatId).subscribe((boatdetails:any)=>{
          elem.boatDetail = boatdetails;
          console.log(elem.boatDetail);
        })
      });
    });
  }
  onPageChange(data: any) {
    this.queryParams.page = data.page;
    this.getUserCharters();
  }
  onPageSizeChange(data: any) {
    this.queryParams.page = 1;
    this.queryParams.pageSize = data.pageSize;
    this.getUserCharters();
  }

}
