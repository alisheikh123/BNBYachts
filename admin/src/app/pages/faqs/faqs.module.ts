import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FaqsRoutingModule, routedComponents } from './faqs-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbButtonModule, NbCardModule, NbIconModule, NbInputModule, NbTreeGridModule } from '@nebular/theme';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SmartTableModule } from 'ng2-smart-table';


@NgModule({
  imports: [
    CommonModule,
    NbCardModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NbTreeGridModule,
    NbIconModule,
    NbButtonModule,
    NbInputModule,
    Ng2SmartTableModule,
    FaqsRoutingModule
  ],
  declarations: [
    ...routedComponents,
    ],
  providers:[NgbActiveModal]
})
export class FaqsModule { }
