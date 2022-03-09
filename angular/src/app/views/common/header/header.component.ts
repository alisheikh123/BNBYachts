import { ForgotPasswordComponent } from './../../auth/components/forgot-password/forgot-password.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { LoginModalComponent } from '../../auth/components/login-modal/login-modal.component';
import { SignupModalComponent } from '../../auth/components/signup-modal/signup-modal.component';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { AuthService } from 'src/app/core/auth/auth.service';
import { AppComponent } from 'src/app/app.component';
import { Roles, UserDefaults, UserRoles } from 'src/app/shared/enums/user-roles';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HubConnection} from '@microsoft/signalr';
import { ChatComponent } from '../../home/components/Chat/chat/chat.component';
import { ChatService } from 'src/app/core/chat/chat.service';
import { HeaderTabs } from 'src/app/shared/enums/header-tabs';
import { OnBoardingModalComponent } from '../on-boarding-modal/on-boarding-modal.component';
import { Keys } from 'src/app/shared/localstoragekey/LocalKeys.constants';


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
  private _hubConnection!: HubConnection;
  private readonly socketUrl = environment.CHAT_API_URL + '/chatsocket';
  canSwitchAccount: boolean = false;
  USER_ROLE = UserRoles;
  roles=Roles;
  rolesList= []as Array<string>;
  USER_DEFAULTS = UserDefaults;
  assetsUrl = environment.CORE_API_URL + '/user-profiles/';
  assetUrlS3 = environment.S3BUCKET_URL + '/profilePicture/';
  currentRole:string='';
  keys=Keys;
  @ViewChild('earnwithus', { static: true }) templateRef: any;
  selectedOption = {
    byHost : false,
    byServiceProvider : false
  };
  @ViewChild(ChatComponent) chatComponent: ChatComponent;
  constructor(public router: Router, public app: AppComponent, 
    private toastr: ToastrService, private modal: NgbModal,
    private oidcSecurityService: OidcSecurityService, 
    private authService: AuthService,private chatService:ChatService) { }
    activeTab: number = 0;
    HEADER_TABS = HeaderTabs;

  ngOnInit(): void {
    this.oidcSecurityService
      .checkAuth()
      .subscribe((res: any) => {
                if (res.isAuthenticated) {
          if (res?.accessToken != null && res?.userData?.sub != null) {
            localStorage.setItem(this.keys.AccessToken, res?.accessToken);
            localStorage.setItem(this.keys.UserId, res?.userData?.sub);
          }
        }
        const userId = localStorage.getItem(this.keys.UserId);
        if (userId != null) {
          this.authService.authenticated = true;
          this.getUserDetails();
          this.getUnreadChatCount();
        }
      });
  }
  getUserDetails() {
    this.authService.getUserInfo().subscribe((res: any) => {

        this.userDetails = res;
        this.rolesNotAssigned();
        this.currentRole = this.userDetails?.userRoles?.find((role: any) => role?.normalizedName == this.roles.User)?.normalizedName;
        if (res?.roles?.length > 1) {
        
          this.canSwitchAccount = true;
          this.app.loggedInUserRole = res.roles.find((role: any) => role?.roleId == this.USER_ROLE.user.toLowerCase())?.roleId;

        }
        else {
          this.canSwitchAccount = false;
          this.app.loggedInUserRole = res.roles.find((role: any) => role?.roleId == this.USER_ROLE.user.toLowerCase())?.roleId;
        }
        if (localStorage.getItem(this.keys.UserRole)) {
          this.app.loggedInUserRole = localStorage.getItem(this.keys.UserRole);
          this.currentRole =  localStorage.getItem(this.keys.UserRoleName)|| '';
        }
        else {
          localStorage.setItem(this.keys.UserRole, this.app.loggedInUserRole);
          localStorage.setItem(this.keys.UserRoleName, this.currentRole);
          
        }
        this.isLoggedIn = true;
        this.onBoardingModal();

    })
  }
  getUnreadChatCount() {
    this.chatService.getUnreadCount().subscribe(res => {
      this.app.unReadChatCount = res;
    })
  }

  signUp() {
    let modalRef = this.modal.open(SignupModalComponent, { windowClass: 'custom-modal custom-large-modal' , centered:true});
  }

  login() {
    this.oidcSecurityService.authorize();
  }

  logout() {
    this.oidcSecurityService.logoff();
    this.authService.authenticated = false;
    localStorage.removeItem(this.keys.AccessToken);
    localStorage.removeItem(this.keys.UserId);
    localStorage.removeItem(this.keys.UserRole);
    localStorage.removeItem(this.keys.UserRoleName);
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
rolesNotAssigned(){
    for( let role in this.roles){
      if(this.userDetails?.userRoles){
        let check=  this.userDetails.userRoles.filter((item:any)=> item.normalizedName== this.roles.Captain || item.normalizedName== this.roles.Management || item.normalizedName == this.roles.Cleaning );
   let roleValue= Roles[role as keyof typeof Roles];
    let roleData=  this.userDetails.userRoles.filter((item:any)=> item.normalizedName== roleValue);
    if(roleData.length==0){
      if(!(check.length > 0) && (roleValue== this.roles.Captain || roleValue== this.roles.Management || roleValue== this.roles.Cleaning))
      {
      this.rolesList.push(roleValue);
      }
    }
      }

    };

}
switchRole(role:Roles)
{
  switch (role) {
    case this.roles.Host:
      this.app.loggedInUserRole = this.USER_ROLE.host;
      this.currentRole=this.roles.Host;
      localStorage.setItem('userRole', this.app.loggedInUserRole);
      localStorage.setItem('userRoleName', this.currentRole);
      this.router.navigate(['host-dashboard']);
      this.toastr.success('Account switched to host.', 'Success');
      break;
      case this.roles.User:
        this.app.loggedInUserRole = this.USER_ROLE.user;
        this.currentRole=this.roles.User;
        localStorage.setItem('userRole', this.app.loggedInUserRole);
        localStorage.setItem('userRoleName', this.currentRole);
        this.router.navigate(['']);
        this.toastr.success('Account switched to user.', 'Success'); 
        break;
        case this.roles.Captain:
        this.toastr.success('Account switched to captain.', 'Success'); 
        window.location.href=environment.CAPTAIN_APP_URL;
        break;
        case this.roles.Management:
          this.toastr.success('Account switched to management.', 'Success'); 
          window.location.href=environment.MANAGEMENT_APP_URL;
          break;
          case this.roles.Cleaning:
            this.toastr.success('Account switched to captain.', 'Success'); 
            window.location.href=environment.CLEANING_APP_URL;
            break;
    default:
      this.app.loggedInUserRole = this.USER_ROLE.user;
      this.currentRole=this.roles.User;
      localStorage.setItem('userRole', this.app.loggedInUserRole);
      localStorage.setItem('userRoleName', this.currentRole);
      this.router.navigate(['']);
      this.toastr.success('Account switched to user.', 'Success'); 
      break;
  }
}
tryHosting(){
  this.toastr.success('Try Hosting.', 'Success'); 
  this.router.navigate(['/onboarding']);
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
  onBoardingModal()
  {
    if(this.userDetails?.isInitialLogin==true)
    {
     this.modal.open(OnBoardingModalComponent, { centered: true, windowClass: 'custom-modal custom-small-modal',backdrop:'static' });
    }
  }
}
