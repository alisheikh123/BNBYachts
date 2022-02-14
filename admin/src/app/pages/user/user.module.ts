import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { routedComponents, UserRoutingModule } from './user-routing.module';
import { NbCardModule, NbIconModule, NbInputModule, NbToggleModule, NbTreeGridModule, NbButtonModule } from '@nebular/theme';
import { ThemeModule } from '../../shared/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FsIconComponent } from './user.component';


@NgModule({
  imports: [
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbButtonModule,
    NbInputModule,
    ThemeModule,
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
