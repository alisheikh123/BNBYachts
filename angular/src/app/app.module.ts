import { LoaderComponent } from './shared/loader/component/loader/loader.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbDateAdapter, NgbDateNativeUTCAdapter, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpConfigInterceptor } from './shared/interceptors/http.interceptor';
import { HeaderComponent } from './views/common/header/header.component';
import { FooterComponent } from './views/common/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { AuthModule } from './views/auth/auth.module';
import { OAuthService } from 'angular-oauth2-oidc';
import { AuthModule,LogLevel } from 'angular-auth-oidc-client';
import { AuthAppModule } from './views/auth/auth.module';
import { LoaderService } from './shared/loader/services/loader.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    AuthAppModule,
    AuthModule.forRoot({
      config: {
        authority: 'https://localhost:44311',
        redirectUrl: 'http://localhost:4200',
        postLogoutRedirectUri: 'http://localhost:4200',
        clientId: 'BnBYachts_App',
        scope: 'openid BnBYachts',
        responseType: 'code',
        silentRenew: true,
        useRefreshToken: true,
        logLevel: LogLevel.Debug,
      },
    }),
    
  ],
  providers: [
    // OAuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfigInterceptor,
     
      multi: true
    },
    LoaderService,
    {provide: NgbDateAdapter, useClass: NgbDateNativeUTCAdapter}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
