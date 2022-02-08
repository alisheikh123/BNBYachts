import { MobileVerification } from './../../../shared/interface/mobileVerify';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { countries } from 'src/app/shared/services/countries-data';
import { AuthService } from 'src/app/core/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OnBoardingProfileModalComponent } from '../on-boarding-profile-modal/on-boarding-profile-modal.component';
import { OnBoardingVerifyOtpComponent } from '../on-boarding-verify-otp/on-boarding-verify-otp.component';

@Component({
  selector: 'app-on-boarding-modal',
  templateUrl: './on-boarding-modal.component.html',
  styleUrls: ['./on-boarding-modal.component.scss']
})
export class OnBoardingModalComponent implements OnInit {
  mobileVerification: MobileVerification = { phone: "0", userId: '' };
  public countries: any = countries;
  mobileVerificationForm: FormGroup;
  constructor(public fb: FormBuilder, private service: AuthService, private toastr: ToastrService, private modalService: NgbModal) { }

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
      this.mobileVerification.userId = localStorage.getItem("userId") || "";
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
  }




}
