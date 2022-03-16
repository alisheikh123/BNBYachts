import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routedComponents, ServiceProviderRoutingModule } from './service-provider-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbCardModule } from '@nebular/theme';
import { UiSwitchModule } from 'ngx-toggle-switch';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SmartTableModule } from 'ng2-smart-table';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NbCardModule,
    UiSwitchModule,
    NgbModule,
    ServiceProviderRoutingModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    ...routedComponents,
  ]
})
export class ServiceProviderModule { }
