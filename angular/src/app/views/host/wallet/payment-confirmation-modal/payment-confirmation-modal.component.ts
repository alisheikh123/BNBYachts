import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-payment-confirmation-modal',
  templateUrl: './payment-confirmation-modal.component.html',
  styleUrls: ['./payment-confirmation-modal.component.scss']
})
export class PaymentConfirmationModalComponent {

  @Output() onClose = new EventEmitter();
  constructor(public activeModal:NgbActiveModal) { }

  onActionClick(isConfirm:boolean): void {
    this.onClose.emit(isConfirm);
    this.activeModal.close();
  }
}
