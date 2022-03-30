import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {
   @Input() currentTab:number = 1;
  constructor() { }
  ngOnInit(): void {
  }

}
