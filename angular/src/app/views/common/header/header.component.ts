import { ResetPasswordComponent } from './../../auth/components/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './../../auth/components/forgot-password/forgot-password.component';

import { OAuthService, OAuthSuccessEvent } from 'angular-oauth2-oidc';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginModalComponent } from '../../auth/components/login-modal/login-modal.component';
import { SignupModalComponent } from '../../auth/components/signup-modal/signup-modal.component';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { AuthService } from 'src/app/core/auth/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  // get hasLoggedIn(): boolean {
  //   return this.oAuthService.hasValidAccessToken();
  // }
  // ,private oAuthService: OAuthService
  userDetails:any;
  constructor(private modal: NgbModal,private oidcSecurityService : OidcSecurityService,private authService:AuthService) { }

  ngOnInit(): void {
    this.oidcSecurityService
    .checkAuth()
    .subscribe((res:any) => { 
        if(res.isAuthenticated){
          if(res?.accessToken != null && res?.userData?.sub != null){
            localStorage.setItem('accessToken', res?.accessToken);
            localStorage.setItem('userId', res?.userData?.sub);
          }

        }
        const userId = localStorage.getItem('userId');
        if(userId != null){
          this.getUserDetails(userId);
        }
  });
}
getUserDetails(userId:any){
this.authService.getUserInfo(userId).subscribe(res=>{
if(res==null)
{
  console.log("Error");
}
else{
this.userDetails = res;
this.isLoggedIn = true;
}
})
}
  signUp(){
    let modalRef = this.modal.open(SignupModalComponent,{ windowClass: 'custom-modal custom-large-modal'});
  }

  login(){
    this.oidcSecurityService.authorize();
  }
 

  logout() {
    this.oidcSecurityService.logoff();
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userId');
    this.isLoggedIn = false;
  }

  forgetPassword(){
    let modalRef = this.modal.open(ForgotPasswordComponent,{ windowClass: 'custom-modal custom-small-modal'});

  }


  getUser(){
    const token = this.oidcSecurityService.getAccessToken();
    let user = this.oidcSecurityService.getUserData();
  }

}
