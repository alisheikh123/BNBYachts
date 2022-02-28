import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-onboarding-welcome',
  templateUrl: './onboarding-welcome.component.html',
  styleUrls: ['./onboarding-welcome.component.scss']
})
export class OnboardingWelcomeComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }
  exploreBoats()
  {
    this.modalService.dismissAll();
  }
}
