import { MobileVerification } from './../../../shared/interface/mobileVerify';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { countries } from 'src/app/shared/services/countries-data';
import { AuthService } from 'src/app/core/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription, timer } from 'rxjs';
import { OnBoardingProfileModalComponent } from '../on-boarding-profile-modal/on-boarding-profile-modal.component';

@Component({
  selector: 'app-on-boarding-modal',
  templateUrl: './on-boarding-modal.component.html',
  styleUrls: ['./on-boarding-modal.component.scss']
})
export class OnBoardingModalComponent implements OnInit, OnDestroy {
  mobileVerification: MobileVerification = { phone: 0, userId: '' };
  public countries: any = countries;
  mobileVerificationForm: FormGroup;
  countDown: Subscription;
  counter = 720;
  tick = 1000;
  isInvalidCode: boolean = false;
  @ViewChild('successfullyVerified', { static: true }) verificationConfirmation: any;
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
  submit(template: TemplateRef<any>) {
    if (this.mobileVerificationForm.valid) {
      let formData = this.mobileVerificationForm.value;
      this.mobileVerification.phone = `${formData.countryCode}${formData.phoneNumber}`;
      this.mobileVerification.userId = localStorage.getItem("userId");
      this.service.sendMobileNumber(this.mobileVerification).subscribe((res: any) => {
        this.modalService.dismissAll();
        this.modalService.open(template, { centered: true, windowClass: 'custom-modal custom-small-modal', backdrop: 'static' });
        this.countDown = timer(0, this.tick).subscribe(() => --this.counter);
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
  previousModal() {
    this.modalService.dismissAll();
    this.modalService.open(OnBoardingModalComponent, { centered: true, windowClass: 'custom-modal custom-small-modal', backdrop: 'static' });
  }
  onOtpChange(value: any) {
    if (value.length > 5) {
      this.service.verifyOTP(value).subscribe(res => {
        if (res != null) {
          this.modalService.dismissAll();
          this.modalService.open(this.verificationConfirmation, { centered: true, windowClass: 'custom-modal custom-small-modal', backdrop: 'static' });
        }
        else {
          this.isInvalidCode = true;
        }
      });
    }
  }
  ngOnDestroy() {
    this.countDown == null;
  }
  DismissAll() {
    this.modalService.dismissAll();
    this.service.IsIntialLoginStatus().subscribe(res=>{});
  }
  ResendCode(template: TemplateRef<any>) {
    this.service.sendMobileNumber(this.mobileVerification).subscribe((res: any) => {
      this.modalService.dismissAll();
      this.modalService.open(template, { centered: true, windowClass: 'custom-modal custom-small-modal', backdrop: 'static' });
      this.countDown = timer(0, this.tick).subscribe(() => --this.counter);
    });
  }
  openUploadPicture() {
    this.modalService.dismissAll();
    this.modalService.open(OnBoardingProfileModalComponent, { centered: true, windowClass: 'custom-modal custom-small-modal', backdrop: 'static' });
  }



}
