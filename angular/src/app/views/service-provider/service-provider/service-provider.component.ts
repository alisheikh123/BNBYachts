import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { SignupModalComponent } from '../../auth/components/signup-modal/signup-modal.component';

@Component({
  selector: 'app-service-provider',
  templateUrl: './service-provider.component.html',
  styleUrls: ['./service-provider.component.scss']
})
export class ServiceProviderComponent implements OnInit {
managementAppUrl:string ;
captainAppUrl:string ;
cleaningAppUrl:string;
  constructor() { 
    this.managementAppUrl= environment.MANAGEMENT_APP_URL;
    this.captainAppUrl=environment.CAPTAIN_APP_URL;
    this.cleaningAppUrl=environment.CLEANING_APP_URL;
  }

  ngOnInit(): void {
  }
 
  captain(){
    window.location.href= this.captainAppUrl;
    }
    management(){
      window.location.href= this.managementAppUrl;
    }
    cleaning(){
      window.location.href= this.cleaningAppUrl;
    }
}
