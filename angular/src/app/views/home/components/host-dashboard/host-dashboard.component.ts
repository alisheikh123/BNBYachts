import { Component, OnInit } from '@angular/core';
import { BookingListingService } from 'src/app/core/Booking/booking-listing.service';
import { BookingService } from 'src/app/core/Booking/booking.service';
import { YachtSearchService } from 'src/app/core/yacht-search/yacht-search.service';

@Component({
  selector: 'app-host-dashboard',
  templateUrl: './host-dashboard.component.html',
  styleUrls: ['./host-dashboard.component.scss']
})
export class HostDashboardComponent implements OnInit {
  upcomingReservations: any;

  constructor(private service: BookingListingService, private boatService: YachtSearchService) { }

  ngOnInit(): void {
    this.service.getHostBookings().subscribe(res => {
      this.upcomingReservations = res;
      this.upcomingReservations.forEach((element: any) => {
        this.boatService.boatDetailsById(element.boatId).subscribe((boatdetail: any) => {
          element.boatDetail = boatdetail;
        });
      });
    })
  }

}
