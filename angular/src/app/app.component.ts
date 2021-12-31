import { Component, OnInit } from '@angular/core';
import { NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'BnB Yacht';
  public loggedInUserRole: any = null;
  public unReadChatCount: number = 0;

  constructor(private config: NgbDatepickerConfig){
    config.minDate = { year: new Date().getFullYear(), month: 
      new Date().getMonth() + 1, day: new Date().getDate() };
        //config.maxDate = { year: 2099, month: 12, day: 31 };
      config.outsideDays = 'hidden';
  }

  onActivate(event:any) {
    window.scroll(0,0);
}

}
