import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginModalComponent } from '../login-modal/login-modal.component';

@Component({
  selector: 'app-signup-modal',
  templateUrl: './signup-modal.component.html',
  styleUrls: ['./signup-modal.component.scss']
})
export class SignupModalComponent implements OnInit {

  constructor(private modal : NgbModal,public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }
  login(){
    this.activeModal.dismiss();
    let modalRef = this.modal.open(LoginModalComponent,{windowClass:'custom-modal custom-small-modal'});
  }
  
}
