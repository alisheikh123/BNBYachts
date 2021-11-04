import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  ForgetForm:FormGroup;
  constructor(public activeModal:NgbActiveModal,private fb:FormBuilder,private service:AuthService) { }

  ngOnInit(): void {
    this.ForgetForm = this.fb.group({
      email:[null, Validators.required]
    })
  }

 submit(){

  console.log();
 }
}
