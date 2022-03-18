import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routedComponents, SettingTabRoutingModule } from './setting-tab-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbCardModule } from '@nebular/theme';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NbCardModule,
    NgbModule,
    SettingTabRoutingModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    NgbModal
  ]
})
export class SettingTabModule { }
