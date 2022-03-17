import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-booking-confirmed-modal',
  templateUrl: './booking-confirmed-modal.component.html',
  styleUrls: ['./booking-confirmed-modal.component.scss']
})
export class BookingConfirmedModalComponent implements OnInit {

  constructor(public activeModal:NgbActiveModal,private router:Router) { }

  ngOnInit(): void {
  }
  goToBookings(){
    this.router.navigate(['boat-listing/all-reservations']);
    this.activeModal.dismiss();
  }

}
