import { MobileVerification } from './../../../shared/interface/mobileVerify';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component,  OnInit } from '@angular/core';
import { countries } from 'src/app/shared/services/countries-data';
import { AuthService } from 'src/app/core/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OnBoardingVerifyOtpComponent } from '../on-boarding-verify-otp/on-boarding-verify-otp.component';
import { OnBoardingProfileModalComponent } from '../on-boarding-profile-modal/on-boarding-profile-modal.component';

@Component({
  selector: 'app-on-boarding-modal',
  templateUrl: './on-boarding-modal.component.html',
  styleUrls: ['./on-boarding-modal.component.scss']
})
export class OnBoardingModalComponent implements OnInit {
  mobileVerification: MobileVerification = { phone: "0", userId: '' };
  countries: any = countries;
  mobileVerificationForm: FormGroup;
  otpGenerationTime =
  {
    expiryTime:"",
    currentTime:""
  };
  constructor(private fb: FormBuilder, private service: AuthService, private toastr: ToastrService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.mobileVerificationConfiguration();
  }
  mobileVerificationConfiguration() {
    this.mobileVerificationForm = this.fb.group({
      phoneNumber: ["", Validators.required],
      countryCode: [null, Validators.required],
    });
  }
  submit() {
    if (this.mobileVerificationForm.valid) {
      let formData = this.mobileVerificationForm.value;
      this.mobileVerification.phone = `${formData.countryCode}${formData.phoneNumber}`;
      this.service.sendMobileNumber(this.mobileVerification).subscribe((res: any) => {
          this.modalService.dismissAll();
          this.modalService.open(OnBoardingVerifyOtpComponent, { centered: true, windowClass: 'custom-modal custom-small-modal', backdrop: 'static' });

      });
    }
    else {
      this.toastr.error('Invalid Form Data ', 'Error');
    }
  }
  selectCountry(event: any) {
    var code = event.target.value;
    this.mobileVerificationForm.controls['countryCode'].setValue(code);
  }
  DismissAll() {
    this.modalService.dismissAll();
    this.service.IsIntialLoginStatus().subscribe(res=>{});
    this.modalService.open(OnBoardingProfileModalComponent, { centered: true, windowClass: 'custom-modal custom-small-modal', backdrop: 'static' })
  }




}
