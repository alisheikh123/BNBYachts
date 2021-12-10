import { Component, Input, OnInit } from '@angular/core';
import { BookingService } from 'src/app/core/Booking/booking.service';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-list-reviews',
  templateUrl: './list-reviews.component.html',
  styleUrls: ['./list-reviews.component.scss']
})
export class ListReviewsComponent implements OnInit {
  reviews: any;

  constructor(
    private service: BookingService,
    private userService:AuthService
  ) { }
  @Input() bookingId: number

  ngOnInit(): void {
    this.getReviews()
  }

  getReviews(){
    this.service.getReviews(this.bookingId).subscribe((res: any) => {
      this.reviews = res;
      res.forEach((elem: any) => {
        this.userService.getUserInfo().subscribe((userDetails: any) => {
          elem.userDetails = userDetails;
        });
      });
     });
  }

}
