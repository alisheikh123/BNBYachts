import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarketingRoutingModule, routedComponents } from './marketing-routing.module';
import { NbButtonModule, NbCardModule, NbInputModule, NbToggleModule } from '@nebular/theme';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MarketingRoutingModule,
    NbCardModule,
    NgbModule,
    NbButtonModule,
    NbInputModule,
    NbToggleModule,
    Ng2SmartTableModule
  ],
  declarations: [
    ...routedComponents,
  ],
  providers:[NgbActiveModal]
})
export class MarketingModule { }