import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
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

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
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
