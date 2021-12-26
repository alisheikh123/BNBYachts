import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LocalStoreService } from 'src/app/shared/services/local-store.service';
import { environment } from 'src/environments/environment';
import { isJSDocThisTag } from 'typescript';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiCoreURl = environment.CORE_API_URL;
  apiIdentityURl = environment.IDENTITY_API_URL;
  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;
  authenticated: boolean = false;
  constructor(private http: HttpClient, public oidcSecurityService: OidcSecurityService, private store: LocalStoreService) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
    this.checkAuth();
  }

  // Authenticate(loginDetail: any) {
  //   return this.http.post(this.apiCoreURl + "/api/Auth/Logins", loginDetail);
  // }

  checkAuth() {
    if (localStorage.getItem('userId') != null) {
      this.authenticated = true;
    }
  }

  getUserInfo() {
    return this.http.get(this.apiCoreURl + "/api/GetLoggedInUserDetails");
  }
  getUserInfoByUserName(userName: string) {
    return this.http.get(this.apiCoreURl + "/api/GetUserDetailsByUserName?username=" + userName);
  }

  login() {
    this.oidcSecurityService.authorize();
    const token = this.oidcSecurityService.getAccessToken();
  }

  logout() {
    this.oidcSecurityService.logoff();
  }

  sendEmail(Email: any) {
    return this.http.get(this.apiCoreURl + "/api/forgot/" + Email);
  }

  updatePassword(userId: any, Password: any) {
    let params = new HttpParams()
      .set('userId', userId)
      .set('Password', Password);
    return this.http.get(this.apiCoreURl + "/api/reset/", { params: params });
  }

  verifyUniqueId(uniqueId: any) {
    return this.http.get(this.apiCoreURl + "/api/verifyLink/" + uniqueId, { responseType: 'text' });
  }

  registerUser(userData: any): Observable<any> {
    this.isLoadingSubject.next(true);
    return this.http.post(this.apiCoreURl + "/api/register/", userData)
      .pipe(finalize(() => this.isLoadingSubject.next(false)));
  }

  confirmEmail(userName: any, token: any) {
    return this.http.get<any>(this.apiCoreURl + "/api/confirm-email?username=" + userName + "&token=" + token);
  }
  resendEmail(userName: any) {
    return this.http.get<any>(this.apiCoreURl + "/api/Resend-Email?username=" + userName);
  }
  updateUserProfile(userData: any): Observable<any> {
    this.isLoadingSubject.next(true);
    return this.http.put(this.apiCoreURl + "/api/Update-User-Profile/", userData)
      .pipe(finalize(() => this.isLoadingSubject.next(false)));
  }

  isEmailExists(email:string) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('X-Skip-Loader-Interceptor', 'true');
    return this.http.post<boolean>(this.apiCoreURl + "/api/app/user/is-email-exists?email="+email,null,{headers:headers});
  }

}
