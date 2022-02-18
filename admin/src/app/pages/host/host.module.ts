import { UiSwitchModule } from 'ngx-toggle-switch';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HostRoutingModule, routedComponents } from './host-routing.module';
import { NbCardModule, NbIconModule, NbInputModule, NbTreeGridModule } from '@nebular/theme';
import { ThemeModule } from '../../shared/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  imports: [
    CommonModule,
    NbCardModule,
    UiSwitchModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    NgbModule,
    HostRoutingModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers:[]
})
export class HostModule { }
