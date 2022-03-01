import { Component, OnInit } from '@angular/core';
import { NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-main-serviceprovide',
  templateUrl: './main-serviceprovide.component.html',
  styleUrls: ['./main-serviceprovide.component.scss']
})
export class MainServiceprovideComponent implements OnInit {

  title = 'BnB Yacht';
  public loggedInUserRole: any = null;
  public unReadChatCount: number = 0;

  constructor(private config: NgbDatepickerConfig){
    config.minDate = { year: new Date().getFullYear(), month: 
      new Date().getMonth() + 1, day: new Date().getDate() };
        //config.maxDate = { year: 2099, month: 12, day: 31 };
      config.outsideDays = 'hidden';
  }
  ngOnInit(): void {
    
  }

  onActivate(event:any) {
    window.scroll(0,0);
}
}
