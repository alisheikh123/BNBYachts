import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { BookingService } from 'src/app/core/Booking/booking.service';
import { utils } from 'src/app/shared/utility/utils';
import { AddReviewModalComponent } from '../../common/add-review-modal/add-review-modal.component';

@Component({
  selector: 'app-reservation-detail',
  templateUrl: './reservation-detail.component.html',
  styleUrls: ['./reservation-detail.component.scss']
})
export class ReservationDetailComponent implements OnInit {

  bookingId: number;
  booking: any;
  checkInDate: any;
  checkOutDate: any;
  totalDays: any;
  currentDate: any;
  hideCancellationbtn: boolean;
  isHourslessthanones: any;
  isCurrentDateGreater: any;
  constructor(private service: BookingService, public activatedRoute: ActivatedRoute, private route: Router, private modal: NgbModal, private toastr: ToastrService) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(res => {
      this.bookingId = Number(res['id']);

    });

    this.service.getBookingBoatDetail(this.bookingId).subscribe((res: any) => {
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

  addReview() {
    this.modal.open(AddReviewModalComponent, { windowClass: 'custom-modal custom-small-modal', centered: true }).componentInstance.onSave.subscribe((res: any) => {
      let review = {
        revieweeID: this.booking[0]?.boatId,
        bookingId: this.bookingId,
        reviewDescription: res.reviewText,
        ratings: res.ratingStars
      };
      this.service.addReview(review).subscribe(res => {
        if (res) {
          this.modal.dismissAll();
          this.toastr.success("Review Added Successfully", "Review");
        }
      });
    });
  }

}


