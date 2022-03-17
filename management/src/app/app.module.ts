import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbDateAdapter, NgbDateNativeUTCAdapter, NgbDateParserFormatter, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {  HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpConfigInterceptor } from './shared/interceptors/http.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from 'src/environments/environment';
import { NgxStripeModule } from 'ngx-stripe';
import { AuthAppModule } from './views/auth/auth.module';
import { AuthModule, LogLevel } from 'angular-auth-oidc-client';
import { SharedPipesModule } from './shared/pipes/shared-pipes.module';
import { TranslateService } from './core/translate.service';
import { NgbCustomDateParserFormatter } from './shared/formatters/datepicker-formatter';
import { NgOtpInputModule } from 'ng-otp-input';
import {CarouselModule} from 'primeng/carousel';
@NgModule({
  declarations: [
    AppComponent,
    ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    AuthAppModule,
    SharedPipesModule,
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
    NgxStripeModule.forRoot(environment.stripeKey),
    NgOtpInputModule,
    CarouselModule
  ],
  providers: [
    // OAuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfigInterceptor,

      multi: true
    },
    {provide: NgbDateAdapter, useClass: NgbDateNativeUTCAdapter},
    TranslateService,
    {
      provide: APP_INITIALIZER,
      useFactory: setupTranslateFactory,
      deps: [TranslateService],
      multi: true
    },
    { provide: NgbDateParserFormatter, useClass: NgbCustomDateParserFormatter }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function setupTranslateFactory(service: TranslateService): Function {
  return () => service.use('en');
}
