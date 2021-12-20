import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-event-creation-success-modal',
  templateUrl: './event-creation-success-modal.component.html',
  styleUrls: ['./event-creation-success-modal.component.scss']
})
export class EventCreationSuccessModalComponent implements OnInit {
  @Input() data: any;
  constructor(public activeModal:NgbActiveModal
    ) { }

  ngOnInit(): void {
  }

}
