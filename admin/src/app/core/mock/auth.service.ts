import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { environment } from '../../../environments/environment';
import { finalize } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
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
    this.router.navigate(['/login']);
  }
  getUserInfo() {
    return this.http.get(this.apiCoreURl + "/api/app/user/logged-in-user-details");
  }
  getUserInfoById(id:string) {
    return this.http.get(this.apiCoreURl + "/api/app/user/user-details-by-id/"+id);
  }
  getUserInfoByUserName(userName: string) {
    return this.http.get(this.apiCoreURl + "/api/app/user/user-details-by-user-name?username=" + userName);
  }

  login() {
    this.oidcSecurityService.authorize();
    localStorage.setItem("accessToken", this.oidcSecurityService.getAccessToken());
  }

  logout() {
    this.oidcSecurityService.logoff();
  }
  registerUser(userData: any): Observable<any> {
    this.isLoadingSubject.next(true);
    return this.http.post(this.apiCoreURl + "/api/app/user/user-register/", userData)
      .pipe(finalize(() => this.isLoadingSubject.next(false)));
  }

  confirmEmail(userName: any, token: any) {
    return this.http.get<any>(this.apiCoreURl + "/api/app/user/confirm-email?username=" + userName + "&token=" + token);
  }
  resendEmail(userName: any) {
    return this.http.get<any>(this.apiCoreURl + "/api/app/user/resend-email?username=" + userName);
  }
  updateUserProfile(userData: any): Observable<any> {
    this.isLoadingSubject.next(true);
    return this.http.put(this.apiCoreURl + "/api/app/user/admin-profile", userData)
      .pipe(finalize(() => this.isLoadingSubject.next(false)));
  }

  isEmailExists(email:string) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('X-Skip-Loader-Interceptor', 'true');
    return this.http.post<boolean>(this.apiCoreURl + "/api/app/user/is-email-exists?email="+email,null,{headers:headers});
  }
  checkAdminRole(userId : string) {
    return this.http.get(this.apiCoreURl + "/api/app/user/check-admin-role-name/"+userId);
  }
}

