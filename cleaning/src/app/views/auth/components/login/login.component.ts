import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { AuthService } from 'src/app/core/auth/auth.service';
import { ServiceProviderService } from 'src/app/core/serviceprovider/serviceprovider.service';
import { ServiceProviderType } from 'src/app/shared/enums/service-provider-type';
import { Keys } from 'src/app/shared/localstoragekey/LocalKeys.constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLoggedIn : boolean;
  keys= Keys;
  serviceProviderType= ServiceProviderType;
  checkServiceProvider={
    serviceProviderType:this.serviceProviderType.cleaning
  };
  constructor(private _serviceProviderService: ServiceProviderService,private authService: AuthService ,private oidcSecurityService : OidcSecurityService,private router : Router ) { }

  ngOnInit(): void {
    this.oidcSecurityService
  .checkAuth()
  .subscribe((res: any) => {
            if (res.isAuthenticated) { 
              this.authService.authenticated = res.isAuthenticated;
      if (res?.accessToken != null && res?.userData?.sub != null) {
        localStorage.setItem(this.keys.UserId, res?.userData?.sub);
        localStorage.setItem(this.keys.AccessToken, res?.accessToken); 
         this.checkAuthorizedUser();      
      }  
    }
    else{
      this.oidcSecurityService.authorize();
    }
  });
  }
  checkAuthorizedUser(){
    this._serviceProviderService.alreadyServiceProvider(this.checkServiceProvider).subscribe((res:any)=>{ 
      if(!res.returnStatus)
      {   this.router.navigate(['/app/cleaning']);
      }
      else{
        this.authService.authenticated=false;
        localStorage.clear();
        this.router.navigate(['/notauthorize']);
      }
          });
  }
}
