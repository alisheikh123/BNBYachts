import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HelpCenterRoutingModule } from './help-center-routing.module';
import { ContactUsFormComponent } from './components/contact-us-form/contact-us-form.component';
import { HelpCenterService } from 'src/app/core/help-center/help-center.service';
import { HelpCenterComponent } from './components/help-center/help-center.component';
import { DisputeFormComponent } from './components/dispute-form/dispute-form.component';
import { FindUsComponent } from './components/find-us/find-us.component';
import { AskUsComponent } from './components/ask-us/ask-us.component';
import { YachtSearchService } from 'src/app/core/yacht-search/yacht-search.service';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { GoogleMapsModule } from '@angular/google-maps';
import { SharedPipesModule } from 'src/app/shared/pipes/shared-pipes.module';


@NgModule({
  declarations: [
    ContactUsFormComponent,
    HelpCenterComponent,
    DisputeFormComponent,
    FindUsComponent,
    AskUsComponent
  ],
  imports: [
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    HelpCenterRoutingModule,
    GooglePlaceModule,
    GoogleMapsModule,
    SharedPipesModule
  ],
  providers: [HelpCenterService,YachtSearchService],
})
export class HelpCenterModule { }
