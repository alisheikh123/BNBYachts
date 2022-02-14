import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { environment } from '../../../environments/environment';
import { LocalStoreService } from './local-store.service';
@Injectable()
export class AuthService {
  apiCoreURl = environment.CORE_API_URL;
  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;
  authenticated: boolean = false;
  isLoggedIn!: boolean;
  constructor(private http: HttpClient, 
    public oidcSecurityService: OidcSecurityService, 
    // private store: LocalStoreService, 
    private router: Router) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
    this.checkAuth();
  }
  
  checkAuth() {
    if (localStorage.getItem('userId') != null) {
      this.authenticated = true;
    }
  }
  loggedIn() {
    if (!this.oidcSecurityService.getAccessToken())
      return false;
    else
      return true;
  }
  logoff(): void {
    this.oidcSecurityService.logoff();
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userId');
    this.isLoggedIn = false;
    this.router.navigate(['/']);
  }
  getUserInfo() {
    return this.http.get(this.apiCoreURl + "/api/GetLoggedInUserDetails");
  }
  getUserInfoById(id:string) {
    return this.http.get(this.apiCoreURl + "/api/GetUserDetailsById/"+id);
  }
  getUserInfoByUserName(userName: string) {
    return this.http.get(this.apiCoreURl + "/api/GetUserDetailsByUserName?username=" + userName);
  }

  login() {
    this.oidcSecurityService.authorize();  
    localStorage.setItem("accessToken", this.oidcSecurityService.getAccessToken());
  }

  logout() {
    localStorage.removeItem("accessToken");
    this.oidcSecurityService.logoff();
  }
}
