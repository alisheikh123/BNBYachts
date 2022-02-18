import { PagesModule } from './pages/pages.module';
import { UserModule } from './pages/user/user.module';
import { HomeDashboardModule } from './pages/home-dashboard/home-dashboard.module';
import { RoutesGuard } from './routes.guard';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbToggleModule,
  NbWindowModule,
} from '@nebular/theme';
import { CoreModule } from './core/core.module';
import { ThemeModule } from './shared/theme.module';
import { environment } from '../environments/environment';
import { AuthModule } from 'angular-auth-oidc-client';
import { httpConfigurationClient } from './shared/intercepters/http.interceptor';
import { NgxStarRatingModule } from 'ngx-star-rating';
import { UiSwitchModule } from 'ngx-toggle-switch';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    HomeDashboardModule,
    ThemeModule,
    CommonModule,
    AppRoutingModule,
    AuthModule.forRoot({
      config: {
        authority: environment.Identity.authority,
        redirectUrl: environment.Identity.redirectUrl,
        postLogoutRedirectUri: environment.Identity.postLogoutRedirectUri,
        clientId: environment.Identity.clientId,
        scope: environment.Identity.scope,
        responseType: environment.Identity.responseType,
      },
    }),
    NgbModule,
    NgxStarRatingModule,
    AppRoutingModule,
    UiSwitchModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    CoreModule.forRoot(),
    ThemeModule.forRoot(),
  ],
  bootstrap: [AppComponent],
  providers: [
      { 
      provide: HTTP_INTERCEPTORS,
       useClass: httpConfigurationClient, 
       multi: true 
      },
    RoutesGuard
  ],
})
export class AppModule {
}
