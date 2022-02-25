import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SignupModalComponent } from '../../auth/components/signup-modal/signup-modal.component';

@Component({
  selector: 'app-service-provider',
  templateUrl: './service-provider.component.html',
  styleUrls: ['./service-provider.component.scss']
})
export class ServiceProviderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
 
  captain(){
    }
    management(){
    }
    cleaning(){
    }
}
