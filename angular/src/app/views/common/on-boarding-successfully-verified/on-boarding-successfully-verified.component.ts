import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OnBoardingProfileModalComponent } from '../on-boarding-profile-modal/on-boarding-profile-modal.component';

@Component({
  selector: 'app-on-boarding-successfully-verified',
  templateUrl: './on-boarding-successfully-verified.component.html',
  styleUrls: ['./on-boarding-successfully-verified.component.scss']
})
export class OnBoardingSuccessfullyVerifiedComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }
  openUploadPicture() {
    this.modalService.dismissAll();
    this.modalService.open(OnBoardingProfileModalComponent, { centered: true, windowClass: 'custom-modal custom-small-modal', backdrop: 'static' });
  }
}
