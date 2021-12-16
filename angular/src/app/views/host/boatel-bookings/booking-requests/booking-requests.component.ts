import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ReservationListsService } from 'src/app/core/host/reservation-lists.service';
import { YachtSearchService } from 'src/app/core/yacht-search/yacht-search.service';
import { ServiceType } from 'src/app/shared/enums/booking.constants';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-booking-requests',
  templateUrl: './booking-requests.component.html',
  styleUrls: ['./booking-requests.component.scss']
})
export class BookingRequestsComponent implements OnInit {
  date: any;
  selectedYear: string = "";
  selectedMonth: string = "";
  @Input() boatelBookings: any;
  selectedServiceType: string = "Service Type";
  SERVICE_TYPES = ServiceType;
  assetsUrl = environment.S3BUCKET_URL + '/boatGallery/';
  modelDate = "";
  constructor(private reservationService: ReservationListsService, private boatService: YachtSearchService, private toastr: ToastrService,config:NgbRatingConfig) { 
    config.max = 5;
    config.readonly = true;
  }

  ngOnInit(): void {
    this.getReservations();
  }

  getReservations() {
    this.reservationService.getBoatelBookingRequests(this.selectedMonth, this.selectedYear).subscribe(res => {
      this.boatelBookings = res;
      this.boatelBookings.forEach((element: any) => {
        this.boatService.boatDetailsById(element.boatId).subscribe((boatdetail: any) => {
          element.boatDetail = boatdetail;
        });
      });
    })
  }
  changeStatus(item: any, isAccepted: boolean, index: any) {
    // Get user against which booking has been approved/rejected
    this.reservationService.changeStatus(item.id, isAccepted).subscribe(res => {
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
  filterServiceType(input: string) {
    this.selectedServiceType = input;
    (input == 'Boatels') ? this.getReservations() : this.clearData();
  }
  clearData() {
    this.boatelBookings = null;
  }

}
