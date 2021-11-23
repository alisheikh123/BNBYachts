import { Component, OnInit } from '@angular/core';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { BookingService } from 'src/app/core/Booking/booking.service';
import { ReservationService } from 'src/app/core/host/reservation.service';
import { YachtSearchService } from 'src/app/core/yacht-search/yacht-search.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-boatel-bookings',
  templateUrl: './boatel-bookings.component.html',
  styleUrls: ['./boatel-bookings.component.scss']
})
export class BoatelBookingsComponent implements OnInit {

  constructor(config: NgbRatingConfig, private reservationService: ReservationService, private boatService: YachtSearchService, private toastr: ToastrService) {
    config.max = 5;
    config.readonly = true;
  };
  boatelBookings: any;
  assetsUrl = environment.BOAT_API_URL + '/boatgallery/';

  ngOnInit(): void {
    this.reservationService.getBoatelBookingRequests().subscribe(res => {
      this.boatelBookings = res;
      this.boatelBookings.forEach((element: any) => {
        this.boatService.boatDetailsById(element.boatId).subscribe((boatdetail: any) => {
          element.boatDetail = boatdetail;
        });
      });
    })
  }

  changeStatus(item: any, isAccepted: boolean, index: any) {
    this.reservationService.changeStatus(item.id, isAccepted).subscribe(res => {
      if (isAccepted) {
        this.toastr.success('Request accepted successfully.', 'Success');
      }
      else {
        this.toastr.success('Request rejected successfully.', 'Success');
      }
      this.boatelBookings.splice(index, 1);
    });
  }

}
