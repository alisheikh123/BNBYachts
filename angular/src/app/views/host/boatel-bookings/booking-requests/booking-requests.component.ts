import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ReservationListsService } from 'src/app/core/host/reservation-lists.service';
import { YachtSearchService } from 'src/app/core/yacht-search/yacht-search.service';
import { ServiceType } from 'src/app/shared/enums/booking.constants';
import { environment } from 'src/environments/environment';
import { RejectionModalComponent } from './rejection-modal/rejection-modal.component';

@Component({
  selector: 'app-booking-requests',
  templateUrl: './booking-requests.component.html',
  styleUrls: ['./booking-requests.component.scss']
})
export class BookingRequestsComponent implements OnInit {
  date: any;
  selectedYear: string = "";
  selectedMonth: string = "";
  @Input() boatelBookings: any = [];
  selectedServiceType: number = 1;
  SERVICE_TYPES = ServiceType;
  assetsUrl = environment.S3BUCKET_URL + '/boatGallery/';
  modelDate = "";
  constructor(private reservationService: ReservationListsService, private boatService: YachtSearchService,
    private toastr: ToastrService, config: NgbRatingConfig, private modal: NgbModal) {
    config.max = 5;
    config.readonly = true;
  }
  bookedServicesTypes = {
    boatel: 1,
    charter: 2,
    event: 3
  };

  ngOnInit(): void {
    this.getReservations();
  }

  getReservations() {
    this.reservationService.getBoatelBookingRequests(this.selectedServiceType, this.selectedMonth, this.selectedYear).subscribe((res: any) => {
      this.boatelBookings = res?.data;
      if (this.selectedServiceType == this.bookedServicesTypes.boatel) {
        this.boatelBookings.forEach((element: any) => {
          this.boatService.boatDetailsById(element.boatId).subscribe((boatdetail: any) => {
            element.boatDetail = boatdetail;
          });
        });
      }
      else if (this.selectedServiceType == this.bookedServicesTypes.charter) {
        this.boatelBookings.forEach((element: any) => {
          this.boatService.charterDetailsById(element.charterId).subscribe((charter: any) => {
            element.boatDetail = charter?.charterDetails?.boat;
          });
        });
      }
      else {
        this.boatelBookings.forEach((element: any) => {
          this.boatService.eventDetailsById(element.eventId).subscribe((event: any) => {
            element.boatDetail = event?.eventDetails?.boat;
          });
        });
      }

    })
  }
  changeStatus(item: any, isAccepted: boolean, index: any) {
    // Get user against which booking has been approved/rejected
    if (isAccepted) {
      this.reservationStatusChange(item, isAccepted, index, '');
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
    this.reservationService.changeStatus(item.id, isAccepted, reason).subscribe(res => {
      isAccepted ? this.toastr.success('Request accepted successfully.', 'Success') : this.toastr.success('Request rejected successfully.', 'Success');
      this.boatelBookings.splice(index, 1);
    });
  }
  applyDateFilter() {
    const stringToSplit = this.modelDate;
    let result = stringToSplit.split('-');
    this.selectedYear = result[0];
    this.selectedMonth = result[1];
    this.getReservations();
  }
  filterServiceType(serviceType: number) {
    this.selectedServiceType = serviceType;
    this.getReservations();
  }
  clearData() {
    this.boatelBookings = null;
  }

}
