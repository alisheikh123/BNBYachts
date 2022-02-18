import { BoatsService } from './backend/common/services/boats.service';
import { DisputeService } from './backend/common/services/dispute.service';
import { AuthService } from './mock/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbSecurityModule, NbRoleProvider } from '@nebular/security';
import { of as observableOf } from 'rxjs';

import { throwIfAlreadyLoaded } from './module-import-guard';
import { LayoutService} from './utils';
import { CommonBackendModule } from './backend/common/common-backend.module';
import { UsersService } from './backend/common/services/users.service';

export class NbSimpleRoleProvider extends NbRoleProvider {
  getRole() {
    return observableOf('guest');
  }
}

export const NB_CORE_PROVIDERS = [
  ...CommonBackendModule.forRoot().providers,
  LayoutService
];

@NgModule({
  imports: [CommonModule],
  declarations: [],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        ...NB_CORE_PROVIDERS,
        UsersService,
        AuthService,
        DisputeService,
        BoatsService
      ],
    };
  }
}
