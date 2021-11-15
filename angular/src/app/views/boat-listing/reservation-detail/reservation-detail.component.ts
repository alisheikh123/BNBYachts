import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from 'src/app/core/Booking/booking.service';

@Component({
  selector: 'app-reservation-detail',
  templateUrl: './reservation-detail.component.html',
  styleUrls: ['./reservation-detail.component.scss']
})
export class ReservationDetailComponent implements OnInit {

  public bd: any;
  public booking:any; 
  checkInDate:any;
  checkOutDate:any;
  totalDays:any;
  constructor(private service: BookingService,public activatedRoute: ActivatedRoute,private route: Router) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(res => {
      this.bd = res['id'].toString();
      
    });  

    this.service.getBookingBoatDetail(this.bd).subscribe((res:any)=>{
      this.booking = res;
      res.forEach((elem:any) => {
        this.checkInDate = new Date(elem?.checkinDate);
        this.checkOutDate = new Date(elem?.checkoutDate);
        this.totalDays = Math.ceil((this.checkOutDate - this.checkInDate) / 8.64e7)+1;
        this.service.getBoatInfo(elem.boatId).subscribe((boatdetail:any)=>{
            elem.boatDetail = boatdetail;
            elem.TotalDays = this.totalDays;
        });
      });
 });
}


     goBack(){
      this.route.navigate(['/boat-listing/all-reservations']); 
    }
  }


