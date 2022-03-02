import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-help-center',
  templateUrl: './help-center.component.html',
  styleUrls: ['./help-center.component.scss']
})
export class HelpCenterComponent implements OnInit {
  navTabs = {
    AskUs: 1,
    ContactUs: 2,
    FindUs: 3,
    Dispute: 4
  };
  currentTab = 1;
  constructor() { }

  ngOnInit(): void {
  }

}
