import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbActiveModal, NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-review-modal',
  templateUrl: './add-review-modal.component.html',
  styleUrls: ['./add-review-modal.component.scss']
})
export class AddReviewModalComponent implements OnInit {

  constructor(config: NgbRatingConfig, public activeModal: NgbActiveModal) {
    config.max = 5;
    config.readonly = false;
  }
  isSubmit:boolean = false;
  @Output() onSave: EventEmitter<any> = new EventEmitter();
  review = {
    ratingStars: 0,
    reviewText: ''
  };

  ngOnInit(): void {
  }

  onSubmit() {
    this.isSubmit = true;
    if(this.review.reviewText != ''){
      this.onSave.emit(this.review);
    }
  }

}
