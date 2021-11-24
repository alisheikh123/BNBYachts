import { ResetPasswordComponent } from './../../auth/components/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './../../auth/components/forgot-password/forgot-password.component';

import { OAuthService, OAuthSuccessEvent } from 'angular-oauth2-oidc';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginModalComponent } from '../../auth/components/login-modal/login-modal.component';
import { SignupModalComponent } from '../../auth/components/signup-modal/signup-modal.component';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { AuthService } from 'src/app/core/auth/auth.service';
import { AppComponent } from 'src/app/app.component';
import { UserRoles } from 'src/app/shared/enums/user-roles';
import { textChangeRangeIsUnchanged } from 'typescript';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


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
  userDetails: any;
  canSwitchAccount: boolean = false;
  USER_ROLE = UserRoles;
  constructor(public router: Router, public app: AppComponent, private toastr: ToastrService, private modal: NgbModal, private oidcSecurityService: OidcSecurityService, private authService: AuthService) { }

  ngOnInit(): void {
    this.oidcSecurityService
      .checkAuth()
      .subscribe((res: any) => {
        if (res.isAuthenticated) {
          if (res?.accessToken != null && res?.userData?.sub != null) {
            localStorage.setItem('accessToken', res?.accessToken);
            localStorage.setItem('userId', res?.userData?.sub);
          }

        }
        const userId = localStorage.getItem('userId');
        if (userId != null) {
          this.getUserDetails(userId);
        }
      });
  }
  getUserDetails(userId: any) {
    this.authService.getUserInfo(userId).subscribe((res: any) => {
      if (res == null) {
        console.log("Error");
      }
      else {
        this.userDetails = res;
        if (res?.roles?.length > 1) {
          this.canSwitchAccount = true;
          this.app.loggedInUserRole = res.roles.find((role: any) => role.roleId == this.USER_ROLE.user.toLowerCase()).roleId;
        }
        else {
          this.canSwitchAccount = false;
          this.app.loggedInUserRole = res.roles.find((role: any) => role.roleId == this.USER_ROLE.user.toLowerCase()).roleId;
        }
        if (localStorage.getItem('userRole')) {
          this.app.loggedInUserRole = localStorage.getItem('userRole');
        }
        else{
          localStorage.setItem('userRole', this.app.loggedInUserRole);
        } 
        this.isLoggedIn = true;
      }
    })
  }
  signUp() {
    let modalRef = this.modal.open(SignupModalComponent, { windowClass: 'custom-modal custom-large-modal' });
  }

  login() {
    this.oidcSecurityService.authorize();
  }


  logout() {
    this.oidcSecurityService.logoff();
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
    this.isLoggedIn = false;
  }

  forgetPassword() {
    let modalRef = this.modal.open(ForgotPasswordComponent, { windowClass: 'custom-modal custom-small-modal' });

  }


  getUser() {
    const token = this.oidcSecurityService.getAccessToken();
    let user = this.oidcSecurityService.getUserData();
  }

  switchRole() {
    if (this.app.loggedInUserRole == this.USER_ROLE.user) {
      this.app.loggedInUserRole = this.USER_ROLE.host;
      this.toastr.success('Account switched to host.', 'Success');
    }
    else {
      this.app.loggedInUserRole = this.USER_ROLE.user;
      this.toastr.success('Account switched to user.', 'Success');
    }
    localStorage.setItem('userRole', this.app.loggedInUserRole);
    this.router.navigate(['']);
  }

}
