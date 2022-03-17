import { NgModule } from '@angular/core';
import {  DisputeRoutingModule, routedComponents } from './diapute-routing.module';
import { NbCardModule, NbIconModule, NbInputModule, NbTreeGridModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    DisputeRoutingModule,
    Ng2SmartTableModule
  ],
  declarations: [
    ...routedComponents,
  ],
  providers:[NgbModal]
})
export class DisputeModule { }
