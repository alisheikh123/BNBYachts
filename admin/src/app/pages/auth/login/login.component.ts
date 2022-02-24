import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'ngx-login',
  template: '<router-outlet></router-outlet>'
})
export class LoginComponent implements OnInit {
  isLoggedIn : boolean;
  constructor(private oidcSecurityService : OidcSecurityService,private router : Router ) { }

  ngOnInit(): void {
    console.log("Login Component");
    this.oidcSecurityService
  .checkAuth()
  .subscribe((res: any) => {
            if (res.isAuthenticated) { 
              this.isLoggedIn = res.isAuthenticated;
      if (res?.accessToken != null && res?.userData?.sub != null) {
        localStorage.setItem('userId', res?.userData?.sub);
        localStorage.setItem('accessToken', res?.accessToken);
      }
      this.router.navigate(['pages/dashboard']);
    }
    else{
      this.oidcSecurityService.authorize();
    }
  });
  }

}
