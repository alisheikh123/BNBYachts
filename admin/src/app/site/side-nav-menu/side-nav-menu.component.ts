import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-side-nav-menu',
  templateUrl: './side-nav-menu.component.html',
  styleUrls: ['./side-nav-menu.component.css']
})

export class SideNavMenuComponent implements OnInit {
  public showLeaveRequest: boolean = true;
  constructor(public app: AppComponent) { }

  ngOnInit(): void {
   
  }  
}
