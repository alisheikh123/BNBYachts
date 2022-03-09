import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UiSwitchModule } from 'ngx-toggle-switch';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { routedComponents, UserRoutingModule } from './user-routing.module';
import { NbCardModule, NbIconModule, NbInputModule, NbToggleModule, NbTreeGridModule, NbButtonModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FsIconComponent } from './user.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NbCardModule,
    UiSwitchModule,
    NgbModule,
    NbTreeGridModule,
    NbIconModule,
    NbButtonModule,
    NbInputModule,
    NbToggleModule,
    UserRoutingModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    ...routedComponents,
    FsIconComponent,
    
  ],
  providers:[]
})
export class UserModule { }
