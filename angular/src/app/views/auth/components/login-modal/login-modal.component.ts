import { HomeComponent } from './../../../home/components/main-home/home.component';
import { AuthService } from './../../../../shared/services/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {Router} from "@angular/router"
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { SignupModalComponent } from '../signup-modal/signup-modal.component';


@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {
  
  isLoggedIn:boolean;
  isCredentialsFalse:boolean;
  LoginForm:FormGroup;
  submitted:boolean=false;
  constructor(private modal:NgbModal,private router: Router,public activeModal : NgbActiveModal,private fb:FormBuilder,private service:AuthService) { }

  ngOnInit(): void {
    this.LoginForm = this.fb.group({
      email:[null, Validators.required],
      Password:[null, Validators.required],
      isRemember:[false]
    })
  }

  signup(){
    this.activeModal.dismiss();
    let modalRef = this.modal.open(SignupModalComponent,{ windowClass: 'custom-modal custom-large-modal'});
  }
  Login(){
    this.isCredentialsFalse=false
    this.submitted=true;
    this.service.login();
  //   this.service.Authenticate(this.LoginForm.value).subscribe((data:any)=>
  //   {
  //     if(data==false)
  //     {
        
  //       this.isCredentialsFalse=true
        
  //     }
  //     else{
  //       console.log(data);
  //       localStorage.setItem('token', JSON.stringify(data["token"]));
  //       localStorage.setItem('expiry', JSON.stringify(data["expiry"]));
  //       localStorage.setItem('IsSwitchUser', JSON.stringify(data["isSwitch"]));
  //       localStorage.setItem('Name', JSON.stringify(data["name"]));
  //       localStorage.setItem('UserID', JSON.stringify(data["userId"]));
  //       localStorage.setItem('ProfilePicture', JSON.stringify(data["profilePicture"]));
  //       this.router.navigate(["/home"])
 
        
         

       
  //     }


    

  // })
  }
  forgotPassword(){
    this.activeModal.dismiss();
    let modalRef = this.modal.open(ForgotPasswordComponent ,{windowClass:'custom-modal custom-small-modal'});
  }

}
