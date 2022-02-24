import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedPipesModule } from 'src/app/shared/pipes/shared-pipes.module';
import { NotFoundModule } from '../../common/not-found-component/not-found.module';
import { PaginationModule } from '../../common/pagination/pagination.module';
import { WalletRoutingModule } from './wallet-routing.module';
import { WalletSettingComponent } from './wallet-setting/wallet-setting.component';
import { PaymentConfirmationModalComponent } from './payment-confirmation-modal/payment-confirmation-modal.component';


@NgModule({
  declarations: [
    WalletSettingComponent,
    PaymentConfirmationModalComponent
  ],
  imports: [
    WalletRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    SharedPipesModule,
    NotFoundModule,
    PaginationModule
    ],
  providers: []
})
export class WalletModule { }
