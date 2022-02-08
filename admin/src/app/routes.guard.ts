import { AuthService } from 'src/app/services/auth/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoutesGuard implements CanActivate {

  constructor(private authService: AuthService) { }
  canActivate(): boolean | any {
    if (this.authService.loggedIn()) {
      return true;
    }
    else {
      this.authService.logoff();
    }
  }
}
