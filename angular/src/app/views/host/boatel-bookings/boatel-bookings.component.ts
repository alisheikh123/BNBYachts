import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbDatepicker, NgbDateStruct, NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { BookingService } from 'src/app/core/Booking/booking.service';
import { ReservationService } from 'src/app/core/host/reservation.service';
import { YachtSearchService } from 'src/app/core/yacht-search/yacht-search.service';
import { ServiceType } from 'src/app/shared/enums/booking.constants';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-boatel-bookings',
  templateUrl: './boatel-bookings.component.html',
  styleUrls: ['./boatel-bookings.component.scss']
})
export class BoatelBookingsComponent implements OnInit {
  date: any;
  selectedYear: string = "";
  selectedMonth: string = "";

  constructor(config: NgbRatingConfig, private reservationService: ReservationService, private boatService: YachtSearchService, private toastr: ToastrService,private bookingServices : BookingService) {
    config.max = 5;
    config.readonly = true;
  };
  boatelBookings: any;
  bookedServices: any;
  selectedServiceType: string = "Service Type";
  SERVICE_TYPES = ServiceType;
  //assetsUrl = environment.BOAT_API_URL + '/boatgallery/';
  assetsUrl = environment.S3BUCKET_URL + '/boatGallery/';
  model: NgbDateStruct;
  modelDate = "";
  @ViewChild('dp') dp: NgbDatepicker;


  ngOnInit(): void {
    // For Reservations
    this.getReservations();
    this.getBookedServices();
  }
  getReservations(){
    this.reservationService.getBoatelBookingRequests(this.selectedMonth,this.selectedYear).subscribe(res => {
      this.boatelBookings = res;
      this.boatelBookings.forEach((element: any) => {
        this.boatService.boatDetailsById(element.boatId).subscribe((boatdetail: any) => {
          element.boatDetail = boatdetail;
        });
      });
    })
  }

  getBookedServices(){
    this.reservationService.getBookedServices().subscribe(res => {
      this.bookedServices = res;
      this.bookedServices.forEach((element: any) => {
        this.boatService.boatDetailsById(element.boatId).subscribe((boatdetail: any) => {
          element.boatDetail = boatdetail;
        });
      });
    })
  }

  changeStatus(item: any, isAccepted: boolean, index: any) {
    // Get user against which booking has been approved/rejected
    this.reservationService.changeStatus(item.id, isAccepted).subscribe(res => {
      if (isAccepted) {
        this.toastr.success('Request accepted successfully.', 'Success');
      }
      else {
        this.toastr.success('Request rejected successfully.', 'Success');
      }
      this.boatelBookings.splice(index, 1);
      this.getBookedServices();
    });
  }
  applyDateFilter(){
    const stringToSplit = this.modelDate;
    let result = stringToSplit.split('-');
    this.selectedYear = result[0];
    this.selectedMonth = result[1];
    this.getReservations();
  }
  filterServiceType(input: string){
    this.selectedServiceType = input;
   (input == 'Boatels')? this.getReservations(): this.clearData();
  }
  clearData(){
    this.boatelBookings = null;
  }
}
