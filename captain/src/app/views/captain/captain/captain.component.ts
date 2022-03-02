import { Component, OnInit } from '@angular/core';
import { NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-captain',
  templateUrl: './captain.component.html',
  styleUrls: ['./captain.component.scss']
})
export class CaptainComponent implements OnInit {
  title = 'BnB Yacht';
  public loggedInUserRole: any = null;
  public unReadChatCount: number = 0;

  constructor(private config: NgbDatepickerConfig){
    config.minDate = { year: new Date().getFullYear(), month: 
      new Date().getMonth() + 1, day: new Date().getDate() };
        //config.maxDate = { year: 2099, month: 12, day: 31 };
      config.outsideDays = 'hidden';
  }
  ngOnInit() {
  
  }
  onActivate(event:any) {
    window.scroll(0,0);
}
}