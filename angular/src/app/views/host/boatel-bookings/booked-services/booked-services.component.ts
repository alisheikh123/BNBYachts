import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { ReservationListsService } from 'src/app/core/host/reservation-lists.service';
import { YachtSearchService } from 'src/app/core/yacht-search/yacht-search.service';
import { BookingResponseFilter, BookingStatus, SelectedServiceType } from 'src/app/shared/enums/booking.constants';

@Component({
  selector: 'app-booked-services',
  templateUrl: './booked-services.component.html',
  styleUrls: ['./booked-services.component.scss']
})
export class BookedServicesComponent implements OnInit {
  charterServices: any;
  eventServices: any;
  bookedServices: any;
  bookedServicesTypes = {
    boatel: 0,
    charter: 1,
    event: 2
  };
  listingFilter =
    {
      modelDate: "",
      selectedYear: "",
      selectedMonth: "",
      BOOKING_STATUS: BookingStatus,
      BOOKING_FILTER: BookingResponseFilter,
      selectedStatusFilter: BookingStatus.ChooseFilter,
      selectedTabStatus: BookingResponseFilter.ChooseFilter,
      activeTab: 0,
      currentReservationStatus: 4,
      selectedServiceType: 0,
      selectedBookingStatus: 0,
      totalRecords: 0,
      SELECTED_SERVICE_TYPE: SelectedServiceType
    };
  queryParams = {
    page: 1,
    pageSize: 5
  };
  getBookingObject =
    {
      filter: 4,
      bookingType: 0,
      month: "",
      pageNo: 0,
      pageSize: 0,
      year: "",
      userId: "",
    };
  constructor(config: NgbRatingConfig, private reservationService: ReservationListsService, private boatService: YachtSearchService, private router: Router) {
    config.max = 5;
    config.readonly = true;
  }

  ngOnInit(): void {
    this.getBookedServices();
  }


  getBookedServices() {
    // this.reservationService.getBookedServices(this.listingFilter.selectedServiceType, this.queryParams.page, this.queryParams.pageSize).subscribe((res: any) => {
    //   this.bookedServices = res?.data;
    //   this.listingFilter.totalRecords = res?.totalCount
    //   if (this.listingFilter.selectedServiceType == this.bookedServicesTypes.boatel) {
    //     this.bookedServices.forEach((element: any) => {
    //       this.boatService.boatDetailsById(element.boatId).subscribe((boatdetail: any) => {
    //         element.boatDetail = boatdetail;
    //       });
    //     });
    //   }
    //   else if (this.listingFilter.selectedServiceType == this.bookedServicesTypes.charter) {
    //     this.bookedServices.forEach((element: any) => {
    //       this.boatService.charterDetailsById(element.charterId).subscribe((charter: any) => {
    //         element.boatDetail = charter?.charterDetails?.boat;
    //         element.charter = charter?.charterDetails;
    //       });
    //     });
    //   }
    //   else {
    //     this.bookedServices.forEach((element: any) => {
    //       this.boatService.eventDetailsById(element.eventId).subscribe((event: any) => {
    //         element.boatDetail = event?.eventDetails?.boat;
    //         element.event = event?.eventDetails;
    //       });
    //     });
    //   }
    // })
    let bookingObject = this.assignValuetoObject();
    if (this.listingFilter.selectedServiceType == this.bookedServicesTypes.boatel) {
      this.reservationService.getBookedServices(bookingObject).subscribe((res: any) => {
        this.bookedServices = res?.data;
        this.listingFilter.totalRecords = res?.totalCount;
        this.boatelStatusFilter(this.listingFilter.currentReservationStatus);
      });
    }
    if (this.listingFilter.selectedServiceType == this.bookedServicesTypes.charter) {
      this.reservationService.getCharterBookedServices(bookingObject).subscribe((res: any) => {
        this.charterServices = res?.data;
        this.listingFilter.totalRecords = res?.totalCount;
        this.charterStatusFilter(this.listingFilter.currentReservationStatus);
      });

    }
    if (this.listingFilter.selectedServiceType == this.bookedServicesTypes.event) {
      this.reservationService.getEventBookedServices(bookingObject).subscribe((res: any) => {
        this.eventServices = res?.data;
        this.listingFilter.totalRecords = res?.totalCount;
        this.eventStatusFilter(this.listingFilter.currentReservationStatus);
      });
    }
  }

  filterServiceType(serviceType: number) {
    this.listingFilter.selectedServiceType = serviceType;
    this.getBookedServices();
  }

  onPageChange(data: any) {
    this.queryParams.page = data.page;
    this.getBookedServices();
  }
  onPageSizeChange(data: any) {
    this.queryParams.page = 1;
    this.queryParams.pageSize = data.pageSize;
    this.getBookedServices();
  }
  goToDetail(item: any) {
    if (this.listingFilter.selectedServiceType == this.bookedServicesTypes.event) {
      this.router.navigate(['/boat-listing/event-reservation-detail', item.eventId])
    }
    if (this.listingFilter.selectedServiceType == this.bookedServicesTypes.charter) {
      this.router.navigate(['/boat-listing/charter-reservation-detail', item.charterId])
    }
    if (this.listingFilter.selectedServiceType == this.bookedServicesTypes.boatel) {
      this.router.navigate(['/boat-listing/reservation-detail', item.id])
    }
  }
  selectedReservationTime(selectedTime: any) {
    this.listingFilter.selectedServiceType = selectedTime.reservationtype;
    this.listingFilter.selectedBookingStatus = selectedTime.reserTime;
    this.getBookedServices();

  }
  selectedDuration(selectedDuration: any) {
    this.listingFilter.selectedServiceType = selectedDuration.reservationtype;
    this.listingFilter.selectedMonth = selectedDuration.month;
    this.listingFilter.selectedYear = selectedDuration.year;
    this.getBookedServices();
  }
  selectedReservationStatus(selectedItem: any) {
    this.listingFilter.currentReservationStatus = selectedItem.reserStatus;
    this.listingFilter.selectedServiceType = selectedItem.reservationtype;
    this.getBookedServices();
  }
  assignValuetoObject() {
    this.listingFilter.currentReservationStatus = this.listingFilter.currentReservationStatus == BookingStatus.ChooseFilter ? BookingStatus.ChooseFilter : this.listingFilter.currentReservationStatus;
    this.getBookingObject.month = this.listingFilter.selectedMonth;
    this.getBookingObject.year = this.listingFilter.selectedYear;
    this.getBookingObject.pageNo = this.queryParams.page;
    this.getBookingObject.pageSize = this.queryParams.pageSize;
    this.getBookingObject.bookingType = this.listingFilter.selectedServiceType == this.bookedServicesTypes.boatel ? this.bookedServicesTypes.boatel : this.listingFilter.selectedServiceType;
    this.getBookingObject.filter = this.listingFilter.selectedBookingStatus == this.listingFilter.BOOKING_FILTER.ChooseFilter ? this.listingFilter.BOOKING_FILTER.All : this.listingFilter.selectedBookingStatus;
    return this.getBookingObject;
  }
  boatelStatusFilter(status: Number) {
    this.bookedServices = (status != null && status != this.listingFilter.BOOKING_STATUS.ChooseFilter) ? this.bookedServices.filter((res: any) => res.bookingStatus == status) : this.bookedServices;
    this.bookedServices.forEach((elem: any) => {
      this.boatService.boatDetailsById(elem.boatId).subscribe((boatdetail: any) => {
        elem.boatDetail = boatdetail;
      });
    });
  }
  charterStatusFilter(status: number) {
    this.charterServices = (status != null && status != this.listingFilter.BOOKING_STATUS.ChooseFilter) ? this.charterServices.filter((res: any) => res.bookingStatus == status) : this.charterServices;
    this.charterServices.forEach((elem: any) => {
      this.boatService.charterDetailsById(elem.charterId).subscribe((charterdetail: any) => {
        elem.charterDetail = charterdetail?.charterDetails;
        this.boatService.boatDetailsById(elem.charterDetail?.boatId).subscribe((boatdetails: any) => {
          elem.boatDetail = boatdetails;
        })
      });
    });
  }
  eventStatusFilter(status: number) {
    this.eventServices = (status != null && status != this.listingFilter.BOOKING_STATUS.ChooseFilter) ? this.eventServices.filter((res: any) => res.bookingStatus == status) : this.eventServices;
    this.eventServices.forEach((elem: any) => {
      this.boatService.eventDetailsById(elem.eventId).subscribe((eventdetail: any) => {
        elem.eventDetail = eventdetail?.eventDetails;
        this.boatService.boatDetailsById(elem.eventDetail?.boatId).subscribe((boatdetails: any) => {
          elem.boatDetail = boatdetails;
        })
      });
    });
  }
}
