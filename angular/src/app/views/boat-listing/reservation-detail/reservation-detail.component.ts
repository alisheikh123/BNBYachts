import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from 'src/app/core/Booking/booking.service';
import { utils } from 'src/app/shared/utility/utils';

@Component({
  selector: 'app-reservation-detail',
  templateUrl: './reservation-detail.component.html',
  styleUrls: ['./reservation-detail.component.scss']
})
export class ReservationDetailComponent implements OnInit {

  public bd: any;
  public booking: any;
  checkInDate: any;
  checkOutDate: any;
  totalDays: any;
  currentDate: any;
  hideCancellationbtn: boolean;
  isHourslessthanones: any;
  isCurrentDateGreater: any;
  constructor(private service: BookingService, public activatedRoute: ActivatedRoute, private route: Router) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(res => {
      this.bd = res['id'].toString();

    });

    this.service.getBookingBoatDetail(this.bd).subscribe((res: any) => {
      this.booking = res;
      res.forEach((elem: any) => {
        this.currentDate = new Date();
        this.checkInDate = new Date(elem?.checkinDate);
        this.checkOutDate = new Date(elem?.checkoutDate);
        this.totalDays = Math.ceil((this.checkOutDate - this.checkInDate) / 8.64e7) + 1;
        this.service.getBoatInfo(elem.boatId).subscribe((boatdetail: any) => {
          elem.boatDetail = boatdetail;
          elem.TotalDays = this.totalDays;
          elem.checkinDate = this.checkInDate;
          elem.checkoutDate = this.checkOutDate;
          // if(this.checkInDate<this.currentDate)
          // {
          //   this.isCurrentDateGreater=false;
          // }
          // if(this.checkInDate==this.currentDate){
          //   this.isCurrentDateGreater=true;
          // }
          // if(this.checkInDate>=this.currentDate){
          //   this.isCurrentDateGreater=true;
          // }

        });
      });

    });
  }
  goBack() {
    this.route.navigate(['/boat-listing/all-reservations']);
  }

}


