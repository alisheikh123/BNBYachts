import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html'
  
})
export class ResetPasswordComponent implements OnInit {
  IsPasswordChanged: boolean=false;
  resetForm: FormGroup;
  uniqueId: any;
  userId: string;
  validPassword: any;
  submitted: boolean = false;
  token: string;
  show:any;
  confirmshow:any;
  @ViewChild('resetModal', { static: true }) templateRef: any;
  @ViewChild('passwordChangedModal', { static: true }) passwordChangedRef: any;
  @ViewChild('InvalidUserModal', { static: true }) InvalidUserRef: any;




  constructor(private modal: NgbModal,private oidcSecurityService : OidcSecurityService, private fb: FormBuilder, private service: AuthService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(res => {
      this.token = res['id'].toString();
    });
    
    this.service.verifyUniqueId(this.token).subscribe((res:any) => {
    
       this.userId = res;
       if(this.userId==null)
       {
        this.InvalidUserModal();
       }
       else{
        this.openModal();
       }
       
      
    });
    this.resetForm = this.fb.group({
      password:[null, Validators.required],
      confirmPassword:[null, Validators.required],
      isRemember:[false]
    })


  }

  openModal() {
    this.modal.open(this.templateRef, { ariaLabelledBy: 'modal-basic-title', centered: true,windowClass:'custom-modal custom-small-modal'})
      .result.then((result) => {

      }, (reason) => {

      });
  }
  InvalidUserModal() {
    this.modal.open(this.InvalidUserRef, { ariaLabelledBy: 'modal-basic-title', centered: true,windowClass:'custom-modal custom-small-modal'})
      .result.then((result) => {

      }, (reason) => {

      });
  }
  passwordChangeModal() {
    this.modal.open(this.passwordChangedRef, { ariaLabelledBy: 'modal-basic-title', centered: true ,windowClass:'custom-modal custom-small-modal'})
    .result.then((result) => {

    }, (reason) => {

    });
  }
  updated() {
    this.validPassword = this.resetForm.controls['password'].value
    this.service.updatePassword(this.userId,this.validPassword).subscribe((res:any)=>{
    
      if(res==true)
      {
       
      if(res==true)
      {
        this.modal.dismissAll();
        this.passwordChangeModal();
   
      }

    });


  }


  login(){
  
    this.oidcSecurityService.authorize();
  }

  password() {
    this.show = !this.show;
}
confirmpassword() {
    this.confirmshow = !this.confirmshow;
}
}
