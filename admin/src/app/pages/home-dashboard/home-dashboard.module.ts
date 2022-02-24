import { DisputeService } from './../../core/backend/common/services/dispute.service';
import { HomeDashboardComponent } from './home-dashboard.component';
import { NgModule } from '@angular/core';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbUserModule,
  NbListModule,
  NbIconModule,
} from '@nebular/theme';

import { FormsModule } from '@angular/forms';
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
