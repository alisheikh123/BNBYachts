import { Component, Input, OnInit } from '@angular/core';
import { BookingService } from 'src/app/core/Booking/booking.service';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Reviews } from 'src/app/shared/interface/reviews';

@Component({
  selector: 'app-list-reviews',
  templateUrl: './list-reviews.component.html',
  styleUrls: ['./list-reviews.component.scss'],
})
export class ListReviewsComponent implements OnInit {
  reviews: Reviews[] = [];
  ClientReview : number;
  reviewSorting: number;
  reviewProgress = {
    fiveStars:0,
    fourStars:0,
    threeStars: 0,
    twoStars : 0,
    oneStar : 0
  };
  userName:string;


  constructor(
    private service: BookingService,
    private userService: AuthService
  ) {}
  @Input() bookingId: number;
  @Input() charterBookingId: number;
  @Input() eventBookingId: number;
  @Input() boatId: number;



  ngOnInit(): void {
    this.changeReview(event);
  }
  changeReview(event : any) {
    if(event == undefined){  
      this.reviewSorting = 0;  
      this.getReviews();
    }else{
      this.reviewSorting = event.target.value;
      this.getReviews();
    }
  }
  getProgressBar() {
    let total = this.reviews.length;
    let reviewData5 = this.reviews.filter((x: { ratings: number; }) => x.ratings == 5).length;
    let reviewData4 = this.reviews.filter((x: { ratings: number; }) => x.ratings == 4).length;
    let reviewData3 = this.reviews.filter((x: { ratings: number; }) => x.ratings == 3).length;
    let reviewData2 = this.reviews.filter((x: { ratings: number; }) => x.ratings == 2).length;
    let reviewData1 = this.reviews.filter((x: { ratings: number; }) => x.ratings == 1).length;
    this.reviewProgress.fiveStars= reviewData5/total * 100;
    this.reviewProgress.fourStars=  reviewData4/total * 100;
    this.reviewProgress.threeStars= reviewData3/total * 100;
    this.reviewProgress.twoStars=  reviewData2/total * 100;
    this.reviewProgress.oneStar=  reviewData1/total * 100;
  }
  getSum() {
    let sum: number = this.reviews.map((a: { ratings: any; })=> a.ratings).reduce(function(a: any, b: any){ return a + b;});
    this.ClientReview = Number((sum/this.reviews.length).toFixed(2));
  }
  getReviews() {
    if (this.boatId == undefined) {
      this.service.getReviews(this.bookingId).subscribe((res: any) => {
        this.reviews = res;
        res.forEach((elem: any) => {
          this.userService.getUserInfoById(elem.reviewerId).subscribe((userDetails: any) => {
            elem.userDetails = userDetails;
          });
        });
      });
    }
    else{
      this.service.getBoatReviews(this.boatId, this.reviewSorting).subscribe((res: any) => {
        this.reviews = res;
        res.forEach((elem: any) => {
          this.userService.getUserInfoById(elem.reviewerId).subscribe((userDetails: any) => {
            elem.userDetails = userDetails;
          });
        });
        this.getSum();
        this.getProgressBar();
      });
    }

  }
}
