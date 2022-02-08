import { AppRoutingModule } from './app-routing.module';
import { UserService } from './services/user.service';
import { AuthAppModule } from './site/auth/auth.module';
import { DisputeListingComponent } from './site/dispute-listing/dispute-listing.component';
import { DisputeService } from './services/site/dispute.service';
import { HostListingComponent } from './site/host-listing/host-listing.component';
import { ErrorService } from './services/error.service';
import { UserListingComponent } from './site/user-listing/user-listing.component';
import { HomeDashboardComponent } from './reports/home-dashboard/home-dashboard.component';
import { BrowserModule } from '@angular/platform-browser';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { NgModule, APP_INITIALIZER, Injector } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { ToggleModule } from '../app/controls/toggle/toggle.module';
import { AppComponent } from './app.component';
import { LoadingIconComponent } from './controls/loading-icon/loading-icon.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';


import { SortableTableDirective } from './directives/sortable-table.directive';
import { NumericOnlyDirective } from './directives/numeric-only.directive';
import { SortableColumnComponent } from './controls/sortable-column/sortable-column.component';
import { SideNavMenuComponent } from './site/side-nav-menu/side-nav-menu.component';
import { PublicLayoutComponent } from './site/public-layout/public-layout.component';
import { PrivateLayoutComponent } from './site/private-layout/private-layout.component';
import { TranslateService } from './services/translate.service';
import { RoutesGuard } from './routes.guard';
// import { PaginationComponent } from './common/pagination/components/pagination.component';
import {AuthModule, LogLevel} from 'angular-auth-oidc-client';
import { environment } from 'src/environments/environment';
import { HttpConfigInterceptor } from './shared/intercepters/http.interceptor';

export let AppInjector: Injector;
@NgModule({
  declarations: [
    // PaginationComponent,
    UserListingComponent,
    HostListingComponent,
    DisputeListingComponent,
    AppComponent,
    PublicLayoutComponent,
    PrivateLayoutComponent,
    LoadingIconComponent,
    NavMenuComponent,
    SortableColumnComponent,
    SortableTableDirective,
    NumericOnlyDirective,
    SideNavMenuComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToggleModule,
    AuthAppModule,
    AccordionModule.forRoot(),
    PaginationModule.forRoot(),
    HttpClientModule,
    AppRoutingModule,
    AuthModule.forRoot({
      config: {
        authority: environment.Identity.authority,
        redirectUrl: environment.Identity.redirectUrl,
        postLogoutRedirectUri: environment.Identity.postLogoutRedirectUri,
        clientId: environment.Identity.clientId,
        scope: environment.Identity.scope,
        responseType: environment.Identity.responseType,
        silentRenew: true,
        useRefreshToken: true,
        logLevel: LogLevel.Debug,
      },
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfigInterceptor,
      multi: true
    },
    TranslateService,
    {
      provide: APP_INITIALIZER,
      useFactory: setupTranslateFactory,
      deps: [TranslateService],
      multi: true
    },
    ErrorService,
    DisputeService,
    RoutesGuard,
    AppComponent
  ],
  bootstrap: [AppComponent]

})
export class AppModule {

}

export function setupTranslateFactory(service: TranslateService): Function {
  let lang = localStorage.getItem('defaultLanguage');
  return () => service.use(lang || 'en');
}