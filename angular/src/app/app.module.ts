import { LoaderComponent } from './shared/loader/component/loader/loader.component';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbDateAdapter, NgbDateNativeUTCAdapter, NgbDateParserFormatter, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpConfigInterceptor } from './shared/interceptors/http.interceptor';
import { HeaderComponent } from './views/common/header/header.component';
import { FooterComponent } from './views/common/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from 'src/environments/environment';
import { NgxStripeModule } from 'ngx-stripe';
import { AuthAppModule } from './views/auth/auth.module';
import { AuthModule, LogLevel } from 'angular-auth-oidc-client';
import { LoaderService } from './shared/loader/services/loader.service';
import { TryHostingComponent } from './views/common/try-hosting/try-hosting.component';
import { BookingService } from './core/Booking/booking.service';
import { MyProfileComponent } from './views/common/user-profile/my-profile/my-profile.component';
import { UpdateProfileComponent } from './views/common/user-profile/update-profile/update-profile.component';
import { SharedPipesModule } from './shared/pipes/shared-pipes.module';
import { AddReviewModalComponent } from './views/common/add-review-modal/add-review-modal.component';
import { TranslateService } from './core/translate.service';
import { NgbCustomDateParserFormatter } from './shared/formatters/datepicker-formatter';
import { ChatService } from './core/chat/chat.service';
import { BookingFilterComponent } from './views/common/booking-filter/booking-filter.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoaderComponent,
    TryHostingComponent,
    MyProfileComponent,
    UpdateProfileComponent,
    AddReviewModalComponent,
    BookingFilterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
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
    NgxStripeModule.forRoot(environment.stripeKey)
  ],
  providers: [
    // OAuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfigInterceptor,

      multi: true
    },
    LoaderService,
    BookingService,
    ChatService,
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
