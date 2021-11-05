import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { UserManager, UserManagerSettings, User } from 'oidc-client';
import { BehaviorSubject } from 'rxjs';


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

  
  httpOptions={
    header:new HttpHeaders({
      'Content-Type':'appllication/json'
    })
  };



  Authenticate(loginDetail:any){
  
    return this.http.post("https://localhost:44311/api/Auth/Logins",loginDetail);
  }

  getUserInfo(UserId:object){
    debugger;
    return this.http.get("https://localhost:44311/api/Auth/UserInfo/"+UserId);
  }



  login() {
    debugger;
    this.oidcSecurityService.authorize();
    debugger;
    const token = this.oidcSecurityService.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    };
    
  }

  logout() {
    this.oidcSecurityService.logoff();
  }

  sendEmail(){

    console.log("Email");
  }


}
