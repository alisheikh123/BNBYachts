import { AuthService } from './../../../core/mock/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'ngx-login',
  template: '<router-outlet></router-outlet>'
})
export class LoginComponent implements OnInit {
  isLoggedIn : boolean;
  isLoggedInRole : boolean = false;
  constructor(private authService : AuthService, private oidcSecurityService : OidcSecurityService,private router : Router) { }

  ngOnInit(): void {
    this.oidcSecurityService
  .checkAuth()
  .subscribe((res: any) => {
            if (res.isAuthenticated) { 
              this.isLoggedIn = res.isAuthenticated;
      if (res?.accessToken != null && res?.userData?.sub != null) {
        localStorage.setItem('userId',res?.userData?.sub);
        localStorage.setItem('accessToken',res?.accessToken);
        this.checkAdminRole(res?.userData?.sub);
      }
    }
    else{
      this.oidcSecurityService.authorize();
    }
  });

}  
checkAdminRole(userId : string){
  this.authService.checkAdminRole(userId).subscribe(res =>{
    if(res == true){
      this.isLoggedInRole = true;
      this.router.navigate(['pages/dashboard']);
    }else{
      this.authService.logoff();
      this.router.navigate(['unauthorize']);
    }
  })
}
}
