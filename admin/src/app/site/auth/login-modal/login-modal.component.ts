import { AppComponent } from 'src/app/app.component';
import { LocalStoreService } from './../../../services/local-store.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
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
