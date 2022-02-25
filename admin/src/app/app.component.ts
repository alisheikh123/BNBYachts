import { LoginComponent } from './pages/auth/login/login.component';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
selector: 'ngx-app',
template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

constructor(protected router: Router,public login : LoginComponent ,private oidcSecurityService : OidcSecurityService) {
}
ngOnInit() {
  if(this.login.isLoggedIn == false){
    this.router.navigate(['/login']);
  }
}
}
