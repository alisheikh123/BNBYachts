import { Component, OnInit } from '@angular/core';
import { NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cleaning',
  templateUrl: './cleaning.component.html',
  styleUrls: ['./cleaning.component.scss']
})
export class CleaningComponent implements OnInit {
  title = 'BnB Yacht';
  public loggedInUserRole: any = null;
  public unReadChatCount: number = 0;

  constructor(private config: NgbDatepickerConfig){
    config.minDate = { year: new Date().getFullYear(), month: 
      new Date().getMonth() + 1, day: new Date().getDate() };
      config.outsideDays = 'hidden';
  }
  ngOnInit() {
  
  }
  onActivate(event:any) {
    window.scroll(0,0);
}
}