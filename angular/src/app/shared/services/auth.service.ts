import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // private user: User | null;
  // private manager = new UserManager(this.getClientSettings());
  // private _authNavStatusSource = new BehaviorSubject<boolean>(false);
  // Observable navItem stream
  // authNavStatus$ = this._authNavStatusSource.asObservable();

  constructor(private http:HttpClient,public oidcSecurityService: OidcSecurityService) {
   }

  Authenticate(loginDetail:any){
  
    return this.http.post("https://localhost:44311/api/Auth/Logins",loginDetail);
  }

  getUserInfo(UserId:object){
    return this.http.get("https://localhost:44311/api/Auth/UserInfo/"+UserId);
  }



  login() {
    this.oidcSecurityService.authorize();
    const token = this.oidcSecurityService.getAccessToken();    
  }

  logout() {
    this.oidcSecurityService.logoff();
  }

  sendEmail(Email:any){
    return this.http.get("https://localhost:44347/forgot/"+Email);
  }
  
  updatePassword(userId:any,Password:any){
   
    let params = new HttpParams()
    .set('userId',userId)
    .set('Password',Password);
    return this.http.get("https://localhost:44347/reset/",{params: params});
  }

  verifyUniqueId(uniqueId:any){

    return this.http.get("https://localhost:44347/verifyLink/"+uniqueId,{responseType: 'text'});
  }

}
