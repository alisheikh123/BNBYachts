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
    {provide: NgbDateAdapter, useClass: NgbDateNativeUTCAdapter}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
