import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/auth/auth.service';
import { WalletService } from 'src/app/core/wallet/wallet.service';
import { states } from 'src/app/shared/services/stripe-us-states-data';
import { PaymentConfirmationModalComponent } from '../payment-confirmation-modal/payment-confirmation-modal.component';

@Component({
  selector: 'app-wallet-setting',
  templateUrl: './wallet-setting.component.html',
  styleUrls: ['./wallet-setting.component.scss']
})
export class WalletSettingComponent implements OnInit {

  statesList: any = states;
  bankForm: FormGroup;
  isSubmitted: boolean = false;
  accountDetail: any;
  unPaidBalance: number = 0;
  escrowBookings:any = [];
  incomingTransactions:any = [];
  constructor(private fb: FormBuilder, private service: WalletService, private toastr: ToastrService
    ,private modal:NgbModal) {
  }

  ngOnInit(): void {
    this.getAccount();
    this.buildFormConfiguration();
    this.getPaymentDetails();
  }
  buildFormConfiguration() {
    this.bankForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      sSN: ['', Validators.required],
      email: [],
      street1: [null, Validators.required],
      street2: [''],
      city: [null, Validators.required],
      country: ['US', Validators.required],
      zipCode: [null, Validators.required],
      state: [this.statesList[0].abbreviation, Validators.required],
      phone: [null, Validators.required],
      accountHolderName: [null, Validators.required],
      accountNumber: [null, Validators.required],
      routingNumber: [null, Validators.required]
    });
  }
  get f() {
    return this.bankForm.controls;
  }

  getAccount() {
    this.service.getAccount().subscribe((res: any) => {
      if(res != null){
        this.accountDetail = res?.data;
        this.getAllIncomingTransaction();
      }
      else{
        this.accountDetail = [];
      }
    })
  }

  addBank() {
    this.isSubmitted = true;
    if (this.bankForm.valid) {
      let data = this.bankForm.value;
      this.service.addBank(data).subscribe(res => {
        this.getAccount();
        this.toastr.success('Bank information successfully added', 'Success');
      })
    }
  }

  getPaymentDetails() {
    this.service.getUnPaidBookings().subscribe((res: any) => {
      this.escrowBookings = res?.data;
      if(res?.data.length > 0){
        this.service.getBookingsBalance(res.data).subscribe((response: any) => {
          this.unPaidBalance = response.data;
        })
      }
    })
  }
  transferToBank() {
    let modal = this.modal.open(PaymentConfirmationModalComponent, { windowClass: 'custom-modal custom-small-modal' });
    modal.componentInstance.onClose.subscribe((res: boolean) => {
      if (res) {
        this.service.transferToBank(this.accountDetail[0]?.account, this.unPaidBalance).subscribe(res => {
          this.unPaidBalance = 0;
          this.setBookingStatusPaid();
          this.getAllIncomingTransaction();
        })
      }
    })
  }

  setBookingStatusPaid() {
    this.service.setBookingStatusPaid(this.escrowBookings).subscribe(res => {
      this.toastr.success('Amount transfered successfully to bank', "Amount Transfer")
    })
  }

  getAllIncomingTransaction() {
    this.service.getAllTransactions(this.accountDetail[0]?.account).subscribe(res => {
      this.incomingTransactions = res;
      console.log(res);
    })
  }

}
