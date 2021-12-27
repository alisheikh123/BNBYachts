import { Component, Output, EventEmitter, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {
  @Input() title: string = 'Confirmation';
  @Input() item: string = '';
  @Input() message: string = 'Are you sure want to delete ';
  @Input() type = 'delete';
  @Output() onClose = new EventEmitter();
  constructor(private activeModal: NgbActiveModal) { }

  public onActionClick(isConfirm:boolean): void {
    this.onClose.emit(isConfirm);
    this.activeModal.close();
  }
}
