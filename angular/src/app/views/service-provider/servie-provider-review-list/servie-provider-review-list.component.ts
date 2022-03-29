import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddReviewModalComponent } from '../../common/add-review-modal/add-review-modal.component';

@Component({
  selector: 'app-servie-provider-review-list',
  templateUrl: './servie-provider-review-list.component.html',
  styleUrls: ['./servie-provider-review-list.component.scss']
})

export class ServieProviderReviewListComponent implements OnInit {
  @Input() serviceProviderId: number;
  review = {
    ratingStars: 0,
    reviewText: ''
  };
  showAddReview: boolean;
  constructor(private fb: FormBuilder, private modal: NgbModal) { }

  ngOnInit(): void {
  }
  addReview() {
    this.modal
      .open(AddReviewModalComponent, {
        windowClass: 'custom-modal custom-small-modal',
        centered: true,
      })
      .componentInstance.onSave.subscribe((res: any) => {
        let review = {
          //revieweeID:,
          reviewDescription: res.reviewText,
          ratings: res.ratingStars,
        };
        // this.service.addReview(review).subscribe((res) => {
        //   if (res) {
        //     this.modal.dismissAll();
        //     this.toaster.success('Review Added Successfully', 'Review');
        //     this.isPosted = true;
        //     this.listReviewComponent.getReviews();
        //   }
        // });
      });
  }
  // getProgressBar() {
  //   let total = this.reviews.length;
  //   let reviewData5 = this.reviews.filter((x: { ratings: number; }) => x.ratings == 5).length;
  //   let reviewData4 = this.reviews.filter((x: { ratings: number; }) => x.ratings == 4).length;
  //   let reviewData3 = this.reviews.filter((x: { ratings: number; }) => x.ratings == 3).length;
  //   let reviewData2 = this.reviews.filter((x: { ratings: number; }) => x.ratings == 2).length;
  //   let reviewData1 = this.reviews.filter((x: { ratings: number; }) => x.ratings == 1).length;
  //   this.reviewProgress.fiveStars= reviewData5/total * 100;
  //   this.reviewProgress.fourStars=  reviewData4/total * 100;
  //   this.reviewProgress.threeStars= reviewData3/total * 100;
  //   this.reviewProgress.twoStars=  reviewData2/total * 100;
  //   this.reviewProgress.oneStar=  reviewData1/total * 100;
  // }
  // getSum() {
  //   let sum: number = this.reviews.map((a: { ratings: any; })=> a.ratings).reduce(function(a: any, b: any){ return a + b;});
  //   this.ClientReview = Number((sum/this.reviews.length).toFixed(2));
  // }
}
