import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { SignupModalComponent } from '../signup-modal/signup-modal.component';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {

  constructor(private modal:NgbModal,public activeModal : NgbActiveModal) { }

  ngOnInit(): void {
  }

  signup(){
    this.activeModal.dismiss();
    let modalRef = this.modal.open(SignupModalComponent,{ windowClass: 'custom-modal custom-large-modal'});
  }

  forgotPassword(){
    this.activeModal.dismiss();
    let modalRef = this.modal.open(ForgotPasswordComponent ,{windowClass:'custom-modal custom-small-modal'});
  }

}
