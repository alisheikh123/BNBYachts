import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-not-logged-in',
  templateUrl: './not-logged-in.component.html',
  styleUrls: ['./not-logged-in.component.scss']
})
export class NotLoggedInComponent implements OnInit {

  constructor(private oidcSecurityService:OidcSecurityService,public activeModal:NgbActiveModal) { }

  ngOnInit(): void {
  }

  login() {
    this.oidcSecurityService.authorize();
  }

}
