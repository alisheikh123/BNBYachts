import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbButtonModule, NbCardModule, NbIconModule, NbInputModule, NbToastrModule, NbToggleModule, NbTreeGridModule } from '@nebular/theme';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ThemeModule } from '../../shared/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { AuthRoutingModule, routedComponents } from './auth-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NbCardModule,
    NgbModule,
    NbTreeGridModule,
    NbIconModule,
    NbButtonModule,
    NbToastrModule,
    NbInputModule,
    ThemeModule,
    NbToggleModule,
    AuthRoutingModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    ...routedComponents,
  ],
})
export class AuthAppModule { }
