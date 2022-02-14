import { RoutesGuard } from './routes.guard';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
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
  NbWindowModule,
} from '@nebular/theme';
import { CoreModule } from './core/core.module';
import { ThemeModule } from './shared/theme.module';
import { environment } from '../environments/environment';
import { AuthService } from './core/mock/auth.service';
import { AuthModule, LogLevel } from 'angular-auth-oidc-client';
import { httpConfigurationClient } from './shared/intercepters/http.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
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
      },
    }),
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    // NbToastrModule.forRoot(),
    // NbChatModule.forRoot({
    //   messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
    // }),
    CoreModule.forRoot(),
    ThemeModule.forRoot(),
  ],
  providers:[
    { 
      provide: HTTP_INTERCEPTORS,
       useClass: httpConfigurationClient, 
       multi: true 
      },
    RoutesGuard,
    AuthService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
