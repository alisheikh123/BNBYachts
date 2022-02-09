import { Component, OnInit } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';


@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent implements OnInit {

  constructor(private oidcSecurityService : OidcSecurityService) { }

  ngOnInit() {
  }
  Login(){
    this.oidcSecurityService.authorize();
  }
}
