import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { AuthService } from 'src/app/core/auth/auth.service';
import { MobileVerification } from 'src/app/shared/interface/mobileVerify';
import { OnBoardingModalComponent } from '../on-boarding-modal/on-boarding-modal.component';
import { OnBoardingSuccessfullyVerifiedComponent } from '../on-boarding-successfully-verified/on-boarding-successfully-verified.component';

@Component({
  selector: 'app-on-boarding-verify-otp',
  templateUrl: './on-boarding-verify-otp.component.html',
  styleUrls: ['./on-boarding-verify-otp.component.scss']
})
export class OnBoardingVerifyOtpComponent implements OnInit{
  isInvalidCode: boolean = false;
  mobileVerification: MobileVerification = { phone: "0", userId: ''};
  beforeExpire:boolean=true;
  otpSubmittion=
  {
  otpCreationTime:'',
  otpExpiryTime:'',
  isOTPExpire:false,

  }

  @ViewChild('successfullyVerified', { static: true }) verificationConfirmation: any;
  constructor(private fb: FormBuilder, private service: AuthService, private modalService: NgbModal) { }
  ngOnInit(): void {
    this.otpSubmittion.otpCreationTime = moment().format();
  }
  previousModal() {
    this.modalService.dismissAll();
    this.modalService.open(OnBoardingModalComponent, { centered: true, windowClass: 'custom-modal custom-small-modal', backdrop: 'static' });
  }
  onOtpChange(value: any) {
    if (value.length > 5) {
      this.otpSubmittion.otpExpiryTime = moment().format();
      let mins = moment.utc(moment(this.otpSubmittion.otpExpiryTime, "HH:mm:ss").diff(moment(this.otpSubmittion.otpCreationTime, "HH:mm:ss"))).format("mm");
      if(Number(mins)>=10)
      {
          this.otpSubmittion.isOTPExpire=true;
          this.beforeExpire = false;
      }
      else{
        this.service.verifyOTP(value).subscribe((res: any)=> {
          if (res?.data != null) {
            this.modalService.dismissAll();
            this.modalService.open(OnBoardingSuccessfullyVerifiedComponent, { centered: true, windowClass: 'custom-modal custom-small-modal', backdrop: 'static' });
          }
          else {
            this.isInvalidCode = true;
          }
        });
      }

    }
  }

  resendCode() {
    this.service.sendMobileNumber(this.mobileVerification).subscribe((res: any) => {
      this.modalService.dismissAll();
      this.modalService.open(OnBoardingVerifyOtpComponent, { centered: true, windowClass: 'custom-modal custom-small-modal', backdrop: 'static' });
    });
  }

}
