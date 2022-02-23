import { BookingResponseFilter, BookingStatus, SelectedServiceType } from './../../../../shared/enums/booking.constants';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { ReservationListsService } from 'src/app/core/host/reservation-lists.service';
import { YachtSearchService } from 'src/app/core/yacht-search/yacht-search.service';
import { ServiceType } from 'src/app/shared/enums/booking.constants';
import { ConfirmDialogComponent } from 'src/app/views/common/confirm-dialog/confirm-dialog.component';
import { environment } from 'src/environments/environment';
import { RejectionModalComponent } from './rejection-modal/rejection-modal.component';

@Component({
  selector: 'app-booking-requests',
  templateUrl: './booking-requests.component.html',
  styleUrls: ['./booking-requests.component.scss']
})
export class BookingRequestsComponent implements OnInit {
  userCharters: any;
  userEvents: any;
  @Input() boatelBookings: any = [];
  assetsUrl = environment.S3BUCKET_URL + '/boatGallery/';
  bookedServicesTypes = {
    boatel: 1,
    charter: 2,
    event: 3
  };
  queryParams = {
    page: 1,
    pageSize: 5
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
      selectedServiceType: 1,
      selectedBookingStatus: 0,
      totalRecords: 0,
      SELECTED_SERVICE_TYPE:SelectedServiceType
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
  constructor(private reservationService: ReservationListsService, private boatService: YachtSearchService,
    private toastr: ToastrService, config: NgbRatingConfig, private modal: NgbModal,
     private router: Router,private activatedRoute:ActivatedRoute) {
    config.max = 5;
    config.readonly = true;
    this.activatedRoute.fragment.subscribe(res=>{
      if(res=='charters'){
        this.listingFilter.selectedServiceType = this.bookedServicesTypes.charter;
      }
      else if(res=='events'){
        this.listingFilter.selectedServiceType = this.bookedServicesTypes.event;
      }
    })
  }

  ngOnInit(): void {
    this.getReservations();
  }
  getReservations() {
    let bookingObject = this.assignValuetoObject();
    if (this.listingFilter.selectedServiceType == this.bookedServicesTypes.boatel) {
      this.reservationService.getBoatelBookingRequests(bookingObject).subscribe((res: any) => {
        this.boatelBookings = res?.data;
        this.listingFilter.totalRecords = res?.totalCount;
        this.boatelStatusFilter(this.listingFilter.currentReservationStatus);
      });
    }
    if (this.listingFilter.selectedServiceType == this.bookedServicesTypes.charter) {
      this.reservationService.getCharterBookings(bookingObject).subscribe((res: any) => {
        this.userCharters = res?.data;
        this.listingFilter.totalRecords = res?.totalCount;
        this.charterStatusFilter(this.listingFilter.currentReservationStatus);
      });

    }
    if (this.listingFilter.selectedServiceType == this.bookedServicesTypes.event) {
      this.reservationService.getEventBookings(bookingObject).subscribe((res: any) => {
        this.userEvents = res?.data;
        this.listingFilter.totalRecords = res?.totalCount;
        this.eventStatusFilter(this.listingFilter.currentReservationStatus);
      });
    }


  }
  boatelStatusFilter(status: Number) {
    this.boatelBookings = (status != null && status != this.listingFilter.BOOKING_STATUS.ChooseFilter) ? this.boatelBookings.filter((res: any) => res.bookingStatus == status) : this.boatelBookings;
    this.boatelBookings.forEach((elem: any) => {
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
        this.boatService.boatDetailsById(elem.eventDetail?.boatId).subscribe((boatdetails: any) => {
          elem.boatDetail = boatdetails;
        })
      });
    });
  }
  changeStatus(item: any, isAccepted: boolean, index: any) {
    if (isAccepted) {
      let modal = this.modal.open(ConfirmDialogComponent, { centered: true, windowClass: 'custom-modal custom-small-modal' });
      modal.componentInstance.message = 'Are your sure.You want to accept this reservation?'
      modal.componentInstance.onClose.subscribe((res: boolean) => {
        if (res) {
          this.reservationStatusChange(item, isAccepted, index, '');
          modal.dismiss();
        }
        else {
          modal.dismiss();
        }
      })
    }
    else {
      let modal = this.modal.open(RejectionModalComponent, { centered: true, windowClass: 'custom-modal custom-small-modal' });
      modal.componentInstance.onSave.subscribe((reason: string) => {
        this.reservationStatusChange(item, isAccepted, index, reason);
        modal.dismiss();
      })
    }

  }

  reservationStatusChange(item: any, isAccepted: boolean, index: any, reason: string) {
    this.reservationService.changeStatus(item.id, isAccepted, reason, this.listingFilter.selectedServiceType).subscribe(res => {
      isAccepted ? this.toastr.success('Request accepted successfully.', 'Success') : this.toastr.success('Request rejected successfully.', 'Success');
      this.boatelBookings.splice(index, 1);
    });
  }
  applyDateFilter(data: any) {
    this.listingFilter.selectedYear = moment(data?.value).format("YYYY");
    this.listingFilter.selectedMonth = moment(data?.value).format("MM");
    this.getReservations();
  }
  filterServiceType(serviceType: number) {
    this.listingFilter.selectedServiceType = serviceType;
    this.getReservations();
  }
  clearData() {
    this.boatelBookings = null;
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
  selectedReservationStatus(selectedItem: any) {
    this.listingFilter.currentReservationStatus = selectedItem.reserStatus;
    this.listingFilter.selectedServiceType = selectedItem.reservationtype;
    this.getReservations();
  }
  selectedReservationTime(selectedTime: any) {
    this.listingFilter.selectedServiceType = selectedTime.reservationtype;
    this.listingFilter.selectedBookingStatus = selectedTime.reserTime;
    this.getReservations();

  }
  selectedDuration(selectedDuration: any) {
    this.listingFilter.selectedServiceType = selectedDuration.reservationtype;
    this.listingFilter.selectedMonth = selectedDuration.month;
    this.listingFilter.selectedYear = selectedDuration.year;
    this.getReservations();
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
}
