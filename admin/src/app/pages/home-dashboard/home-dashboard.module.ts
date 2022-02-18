import { ThemeModule } from './../../shared/theme.module';
import { DisputeService } from './../../core/backend/common/services/dispute.service';
import { HomeDashboardComponent } from './home-dashboard.component';
import { NgModule } from '@angular/core';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbTabsetModule,
  NbUserModule,
  NbRadioModule,
  NbSelectModule,
  NbListModule,
  NbIconModule,
  NbTreeGridModule,
  NbInputModule,
} from '@nebular/theme';
import { NgxEchartsModule } from 'ngx-echarts';

import { FormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';
@NgModule({
  imports: [
    FormsModule,
    NbCardModule,
    NbUserModule,
    NbActionsModule,
    NbListModule,
    NbIconModule,
    NbButtonModule,
  ],
  declarations: [
    HomeDashboardComponent
  ],
  providers:[
     DisputeService
  ]
})
export class HomeDashboardModule { }
