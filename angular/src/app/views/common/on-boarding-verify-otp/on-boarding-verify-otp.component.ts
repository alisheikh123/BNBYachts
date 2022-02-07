import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  mobileVerification: MobileVerification = { phone: "0", userId: '' };
  @ViewChild('successfullyVerified', { static: true }) verificationConfirmation: any;
  constructor(public fb: FormBuilder, private service: AuthService, private modalService: NgbModal) { }
  ngOnInit(): void {
  }
  previousModal() {
    this.modalService.dismissAll();
    this.modalService.open(OnBoardingModalComponent, { centered: true, windowClass: 'custom-modal custom-small-modal', backdrop: 'static' });
  }
  onOtpChange(value: any) {
    if (value.length > 5) {
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

  resendCode() {
    this.service.sendMobileNumber(this.mobileVerification).subscribe((res: any) => {
      this.modalService.dismissAll();
      this.modalService.open(OnBoardingVerifyOtpComponent, { centered: true, windowClass: 'custom-modal custom-small-modal', backdrop: 'static' });
    });
  }

}
