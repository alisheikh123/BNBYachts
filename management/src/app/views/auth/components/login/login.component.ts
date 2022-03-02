import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLoggedIn : boolean;
  constructor(private authService: AuthService ,private oidcSecurityService : OidcSecurityService,private router : Router ) { }

  ngOnInit(): void {
    this.oidcSecurityService
  .checkAuth()
  .subscribe((res: any) => {
            if (res.isAuthenticated) { 
              this.authService.authenticated = res.isAuthenticated;
      if (res?.accessToken != null && res?.userData?.sub != null) {
        localStorage.setItem('userId', res?.userData?.sub);
        localStorage.setItem('accessToken', res?.accessToken);
        this.router.navigate(['/app/management']);
      }
      
    }
    else{
      this.oidcSecurityService.authorize();
    }
  });
  }

}
