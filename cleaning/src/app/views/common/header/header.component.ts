import { ForgotPasswordComponent } from './../../auth/components/forgot-password/forgot-password.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { SignupModalComponent } from '../../auth/components/signup-modal/signup-modal.component';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Roles, UserDefaults, UserRoles } from 'src/app/shared/enums/user-roles';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HubConnection} from '@microsoft/signalr';
import { ChatService } from 'src/app/core/chat/chat.service';
import { HeaderTabs } from 'src/app/shared/enums/header-tabs';
import { CleaningComponent } from '../../cleaning/cleaning/cleaning.component';
import { Keys } from 'src/app/shared/localstoragekey/LocalKeys.constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  userDetails: any;
  private _hubConnection!: HubConnection;
  private readonly socketUrl = environment.CHAT_API_URL + '/chatsocket';
  canSwitchAccount: boolean = false;
  USER_ROLE = UserRoles;
  USER_DEFAULTS = UserDefaults;
  assetsUrl = environment.CORE_API_URL + '/user-profiles/';
  assetUrlS3 = environment.S3BUCKET_URL + '/profilePicture/';
  roles=Roles;
  rolesList= []as Array<string>;
  keys=Keys;
  onBoardingUrl='/onboarding';
  hostDashboardUrl='switchapp/1';
  userDashboardUrl='/switchapp/2';
  @ViewChild('earnwithus', { static: true }) templateRef: any;
  selectedOption = {
    byHost : false,
    byServiceProvider : false
  };
  constructor(public router: Router, public app: CleaningComponent, 
    private toastr: ToastrService, private modal: NgbModal,
    private oidcSecurityService: OidcSecurityService, 
    private authService: AuthService,private chatService:ChatService) { }
    activeTab: number = 0;
    HEADER_TABS = HeaderTabs;

  ngOnInit(): void {    
          this.getUserDetails();
          this.getUnreadChatCount();       
  }
  getUserDetails() {
    this.authService.getUserInfo().subscribe((res: any) => {
        this.userDetails = res;
        this.isLoggedIn = true;

    })
  }

tryHosting(){
  window.location.href = environment.CLIENT_APP_URL + this.onBoardingUrl;
  this.toastr.success('Try Hosting.', 'Success'); 
}
  getUnreadChatCount() {
    this.chatService.getUnreadCount().subscribe(res => {
      this.app.unReadChatCount = res;
    })
  }
  switchRole(role:Roles)
  {
    switch (role) {
      case this.roles.Host:
        window.location.href= environment.CLIENT_APP_URL + this.hostDashboardUrl;
        this.toastr.success('Account switched to host.', 'Success');
        break;
        case this.roles.User:
          window.location.href= environment.CLIENT_APP_URL + this.userDashboardUrl;
          this.toastr.success('Account switched to user.', 'Success'); 
          break;
      default: 
        break;
    }
  }
  logout() {
    this.oidcSecurityService.logoff();
    this.authService.authenticated = false;
    localStorage.removeItem(this.keys.AccessToken);
    localStorage.removeItem(this.keys.UserId);
    localStorage.removeItem(this.keys.UserRole);
    localStorage.clear();
    sessionStorage.clear();
    this.isLoggedIn = false;
  }

  forgetPassword() {
    let modalRef = this.modal.open(ForgotPasswordComponent, { windowClass: 'custom-modal custom-small-modal' });

  }

  getUser() {
    const token = this.oidcSecurityService.getAccessToken();
    let user = this.oidcSecurityService.getUserData();
  }

  earn() {
    if(this.isLoggedIn){
      this.modal.open(this.templateRef, { ariaLabelledBy: 'modal-basic-title', centered: true, windowClass: 'custom-modal custom-small-modal' });
    }
    else{
      let modalRef = this.modal.open(SignupModalComponent,{ windowClass: 'custom-modal custom-large-modal', centered: true});
    }
  }

  continueToEarn() {
    this.modal.dismissAll();
    if(this.selectedOption.byHost){
      this.router.navigate(['try-hosting']);
    }
    else if(this.selectedOption.byServiceProvider){
      this.router.navigate(['service-provider']);
    }

  }
}
