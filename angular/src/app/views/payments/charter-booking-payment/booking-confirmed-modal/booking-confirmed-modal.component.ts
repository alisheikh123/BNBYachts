import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-booking-confirmed-modal',
  templateUrl: './booking-confirmed-modal.component.html',
  styleUrls: ['./booking-confirmed-modal.component.scss']
})
export class BookingConfirmedModalComponent implements OnInit {

  constructor(public activeModal:NgbActiveModal) { }

  ngOnInit(): void {
  }

}
