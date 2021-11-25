import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiCoreURl = environment.CORE_API_URL;
  apiIdentityURl = environment.IDENTITY_API_URL;
  constructor(private http: HttpClient, public oidcSecurityService: OidcSecurityService) {
  }

  // Authenticate(loginDetail: any) {
  //   return this.http.post(this.apiCoreURl + "/api/Auth/Logins", loginDetail);
  // }

  getUserInfo() {
    return this.http.get(this.apiCoreURl + "/GetLoggedInUserDetails");
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

}
