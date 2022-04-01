import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolesPermissionRoutingModule, routedComponents } from './roles-permission-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbButtonModule, NbCardModule, NbInputModule, NbToggleModule } from '@nebular/theme';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SmartTableModule } from 'ng2-smart-table';



@NgModule({
  declarations: [
    routedComponents
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RolesPermissionRoutingModule,
    NbCardModule,
    NgbModule,
    NbButtonModule,
    NbInputModule,
    NbToggleModule,
    Ng2SmartTableModule
  ]
})
export class RolesPermissionModule { }
