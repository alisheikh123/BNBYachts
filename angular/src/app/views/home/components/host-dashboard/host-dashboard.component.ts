import { Component, OnInit } from '@angular/core';
import { BookingService } from 'src/app/core/Booking/booking.service';
import { YachtSearchService } from 'src/app/core/yacht-search/yacht-search.service';

@Component({
  selector: 'app-host-dashboard',
  templateUrl: './host-dashboard.component.html',
  styleUrls: ['./host-dashboard.component.scss']
})
export class HostDashboardComponent implements OnInit {
  upcomingReservations: any;

  constructor(private reservationService : BookingService,private boatService: YachtSearchService) { }

  ngOnInit(): void {
    this.reservationService.getUpcomingHostBookingDetail().subscribe(res => {
      this.upcomingReservations = res;
      this.upcomingReservations.forEach((element: any) => {
        this.boatService.boatDetailsById(element.boatId).subscribe((boatdetail: any) => {
          element.boatDetail = boatdetail;
        });
      });
    })
  }

}
