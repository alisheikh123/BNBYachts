import { NgModule } from '@angular/core';
import {  DisputeRoutingModule, routedComponents } from './diapute-routing.module';
import { NbCardModule, NbIconModule, NbInputModule, NbTreeGridModule } from '@nebular/theme';
import { ThemeModule } from '../../shared/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { DisputeDetailComponent } from './dispute-detail/dispute-detail.component';


@NgModule({
  imports: [
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    DisputeRoutingModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers:[]
})
export class DisputeModule { }
