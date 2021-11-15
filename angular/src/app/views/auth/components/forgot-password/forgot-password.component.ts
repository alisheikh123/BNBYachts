import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  isEmailSending:boolean;
  isInvalidUser:boolean;
  ForgetForm:FormGroup;
  constructor(public activeModal:NgbActiveModal,private fb:FormBuilder,private service:AuthService) { }

  ngOnInit(): void {
    this.isInvalidUser=false;
    this.ForgetForm = this.fb.group({
      email:[null,Validators.compose([Validators.required, Validators.email])]
    })
  }

 submit(){
    let email=this.ForgetForm.controls["email"].value;
    let emailValid=this.ForgetForm.controls["email"].valid;
    this.service.sendEmail(email).subscribe(res=>{
      if(res==true)
      {
        this.isInvalidUser=false;
        this.isEmailSending=true;
        

      }
      else
      {
          this.isInvalidUser=true;
          this.isEmailSending=false;
      }
      })
 }
}
