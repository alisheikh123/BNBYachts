import { UsersService } from './core/backend/common/services/users.service';
import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
selector: 'ngx-app',
template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit, OnDestroy {
private destroy$: Subject<void> = new Subject<void>();

constructor(protected router: Router, private service : UsersService, private oidcSecurityService : OidcSecurityService) {
  this.destroy$;
}
ngOnInit() {
  this.oidcSecurityService
  .checkAuth()
  .subscribe((res: any) => {
            if (res.isAuthenticated) {
      if (res?.accessToken != null && res?.userData?.sub != null) {
        localStorage.setItem('userId', res?.userData?.sub);
        localStorage.setItem('accessToken', res?.accessToken);
      }
      this.router.navigate(['pages/dashboard']);
    }
    else{
      this.oidcSecurityService.authorize();
    }
  });
}
ngOnDestroy() {
  this.destroy$.next();
  this.destroy$.complete();
}
}
