import { UserService } from 'src/app/services/user.service';
import { DisputeListingComponent } from './site/dispute/dispute-listing/dispute-listing.component';
import { HostListingComponent } from './site/host/host-listing/host-listing.component';
import { UserListingComponent } from './site/user/user-listing/user-listing.component';
import { BrowserModule } from '@angular/platform-browser';
import { HomeDashboardComponent } from './reports/home-dashboard/home-dashboard.component';
import { SortService } from './services/sort.service';
import { LocalStoreService } from 'src/app/services/local-store.service';
import { AppRoutingModule } from './app-routing.module';
import { AuthAppModule } from './site/auth/auth.module';
import { ErrorService } from './services/error.service';
import { NgModule, Injector } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { RoutesGuard } from './routes.guard';
import {AuthModule, LogLevel} from 'angular-auth-oidc-client';
import { environment } from 'src/environments/environment';
import { HttpConfigInterceptor } from './shared/intercepters/http.interceptor';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { DisputeService } from './services/site/dispute.service';


export let AppInjector: Injector;
@NgModule({
  declarations: [
    AppComponent,
    UserListingComponent,
    HostListingComponent,
    DisputeListingComponent,
    HomeDashboardComponent,
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
    AccordionModule.forRoot(),
    PaginationModule.forRoot(),
    ToggleModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AuthAppModule,
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
    UserService,
    DisputeService,
    LocalStoreService,
    SortService,
    ErrorService,
    RoutesGuard,
    AppComponent
  ],
  bootstrap: [AppComponent]

})
export class AppModule {

}