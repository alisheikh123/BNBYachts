import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ServiceTypes } from 'src/app/shared/enums/yacht-search.constant';


@Component({
  selector: 'app-no-found-modal',
  templateUrl: './no-found-modal.component.html',
  styleUrls: ['./no-found-modal.component.scss']
})
export class NoFoundModalComponent implements OnInit {
  @Input() yachtType: ServiceTypes;
  message: string[] = ['Boatel', 'Charter', 'Event'];
  constructor(public activeModal:NgbActiveModal) {

   }

  ngOnInit(): void {
    
  }

}
