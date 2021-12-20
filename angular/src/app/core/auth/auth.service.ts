import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiCoreURl = environment.CORE_API_URL;
  apiIdentityURl = environment.IDENTITY_API_URL;
  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;
  constructor(private http: HttpClient, public oidcSecurityService: OidcSecurityService,) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  // Authenticate(loginDetail: any) {
  //   return this.http.post(this.apiCoreURl + "/api/Auth/Logins", loginDetail);
  // }

  getUserInfo() {
    return this.http.get(this.apiCoreURl + "/GetLoggedInUserDetails");
  }
  getUserInfoByUserName(userName: string){
    return this.http.get(this.apiCoreURl + "/GetUserDetailsByUserName?username="+userName);
  }

  login() {
    this.oidcSecurityService.authorize();
    const token = this.oidcSecurityService.getAccessToken();
  }

  logout() {
    this.oidcSecurityService.logoff();
  }

  sendEmail(Email: any) {
    return this.http.get(this.apiCoreURl + "/forgot/" + Email);
  }

  updatePassword(userId: any, Password: any) {
    let params = new HttpParams()
      .set('userId', userId)
      .set('Password', Password);
    return this.http.get(this.apiCoreURl + "/reset/", { params: params });
  }

  verifyUniqueId(uniqueId: any) {
    return this.http.get(this.apiCoreURl + "/verifyLink/" + uniqueId, { responseType: 'text' });
  }
  
  registerUser(userData: any): Observable<any> {
    this.isLoadingSubject.next(true);
    return this.http.post(this.apiCoreURl + "/register/", userData)
      .pipe(finalize(() => this.isLoadingSubject.next(false)));
  }

  confirmEmail(userName: any, token: any) {
    return this.http.get<any>(this.apiCoreURl + "/confirm-email?username="+userName+"&token="+token);
  }
  resendEmail(userName:any){
    return this.http.get<any>(this.apiCoreURl + "/Resend-Email?username="+userName);
  }
  updateUserProfile(userData: any): Observable<any> {
    this.isLoadingSubject.next(true);
    return this.http.put(this.apiCoreURl + "/Update-User-Profile/", userData)
      .pipe(finalize(() => this.isLoadingSubject.next(false)));
  }

}
