import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-rejection-modal',
  templateUrl: './rejection-modal.component.html',
  styleUrls: ['./rejection-modal.component.scss']
})
export class RejectionModalComponent implements OnInit {

  rejectionReason = "";
  isSubmit: boolean = false;
  @Output() onSave: EventEmitter<any> = new EventEmitter();
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  onSubmit(confirm: boolean) {
    this.isSubmit = true;
    if(this.rejectionReason != ""){
      if(confirm){
        this.onSave.emit(this.rejectionReason);
      }
      else{
        this.activeModal.dismiss();
      }
    }
  }

}
