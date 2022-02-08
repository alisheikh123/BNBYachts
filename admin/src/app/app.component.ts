import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { AuthService } from './services/auth/auth.service';
import { UserRoles } from './shared/enums/userRoles';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  loggedInUserRole: any = null;
  isLoggedIn:boolean=false;  
  USER_ROLE = UserRoles;
  userDetails: any;
  constructor(private router: Router,private service:AuthService, private oidcSecurityService : OidcSecurityService) {
  }

  ngOnInit() {
    this.oidcSecurityService
    .checkAuth()
    .subscribe((res: any) => {
              if (res.isAuthenticated) {
        if (res?.accessToken != null && res?.userData?.sub != null) {
          localStorage.setItem('userId', res?.userData?.sub);
          this.router.navigate(['/home']);
        }
      }
      const userId = localStorage.getItem('userId');
      if (userId != null) {
        this.service.authenticated = true;
        this.getUserDetails();
      }
    });
  }
  getUserDetails() {
    this.service.getUserInfo().subscribe((res: any) => {
      if (res == null) {
      }
      else {
        this.userDetails = res;
        if (res?.roles?.length > 1) {
          this.loggedInUserRole = res.roles.find((role: any) => role.roleId == this.USER_ROLE.ADMIN.toLowerCase()).roleId;
        }
        if (localStorage.getItem('userRole')) {
          this.loggedInUserRole = localStorage.getItem('userRole');
        }
        else {
          localStorage.setItem('userRole', this.loggedInUserRole);
        }
        this.isLoggedIn = true;
      }
    })
  }
}
