import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpConfigInterceptor } from './shared/interceptors/http.interceptor';
import { HeaderComponent } from './views/common/header/header.component';
import { FooterComponent } from './views/common/footer/footer.component';
import { NgxStripeModule } from 'ngx-stripe';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgxStripeModule.forRoot(environment.stripeKey)
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfigInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
