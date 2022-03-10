import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';
import { NotAuthorizeRoutingModule } from './not-authorize-routing.module';
import { NotAuthorizeHeaderComponent } from './not-authorize-header/not-authorize-header.component';
import { NotAuthorizeFooterComponent } from './not-authorize-footer/not-authorize-footer.component';



@NgModule({
  declarations: [
    NotAuthorizedComponent,
    NotAuthorizeHeaderComponent,
    NotAuthorizeFooterComponent
  ],
  imports: [
    CommonModule,
    NotAuthorizeRoutingModule
  ]
})
export class NotAuthorizeModule { }
