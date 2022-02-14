import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './core/mock/auth.service';

@Injectable()
export class RoutesGuard implements CanActivate {

  constructor(private authService: AuthService) { }
  canActivate() : Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.loggedIn()) {
      return true;
    }
    else {
      this.authService.logoff();
    }
  }
}
