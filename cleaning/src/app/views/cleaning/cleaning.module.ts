import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../common/header/header.component';
import { LoaderComponent } from 'src/app/shared/loader/component/loader/loader.component';
import { FooterComponent } from '../common/footer/footer.component';
import { CleaningComponent } from './cleaning/cleaning.component';
import { NgbActiveModal, NgbDateAdapter, NgbDateNativeUTCAdapter, NgbDateParserFormatter, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {  CleaningRoutingModule } from './cleaning-routing.module';
import { LoaderService } from 'src/app/shared/loader/services/loader.service';
import { SharedPipesModule } from 'src/app/shared/pipes/shared-pipes.module';
import { NgbCustomDateParserFormatter } from 'src/app/shared/formatters/datepicker-formatter';
import { NgOtpInputModule } from 'ng-otp-input';
import { CarouselModule } from 'primeng/carousel';
import { RouterModule } from '@angular/router';
import { DateRangePickerModule, DateTimePickerModule, TimePickerModule } from '@syncfusion/ej2-angular-calendars';
import { NotFoundModule } from '../common/not-found-component/not-found.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpConfigInterceptor } from 'src/app/shared/interceptors/http.interceptor';
import { MyProfileComponent } from '../common/user-profile/my-profile/my-profile.component';
import { UpdateProfileComponent } from '../common/user-profile/update-profile/update-profile.component';
import { AddReviewModalComponent } from '../common/add-review-modal/add-review-modal.component';
import { OnboardingWelcomeComponent } from '../common/onboarding-welcome/onboarding-welcome.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { TranslateService } from 'src/app/core/translate.service';
import { ChatService } from 'src/app/core/chat/chat.service';



@NgModule({
  declarations: [HeaderComponent ,FooterComponent,LoaderComponent,CleaningComponent,
    MyProfileComponent,
    UpdateProfileComponent,
    AddReviewModalComponent,
    OnboardingWelcomeComponent],
  imports: [
    HttpClientModule,
    CommonModule,
     NgbModule, 
     ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot(),
     SharedPipesModule,
     RouterModule,
     CleaningRoutingModule,
     TimePickerModule ,
     DateRangePickerModule,
     DateTimePickerModule,
     NotFoundModule,
    NgOtpInputModule,
    CarouselModule

  ],
  providers:[
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
    NgbActiveModal ,  {provide: NgbDateAdapter, useClass: NgbDateNativeUTCAdapter},
    LoaderService , ChatService,
    { provide: NgbDateParserFormatter, useClass: NgbCustomDateParserFormatter },]
})
export class CleaningModule { }
export function setupTranslateFactory(service: TranslateService): Function {
  return () => service.use('en');
}
