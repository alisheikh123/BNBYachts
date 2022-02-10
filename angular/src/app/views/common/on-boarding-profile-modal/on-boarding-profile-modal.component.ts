import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/auth/auth.service';
import { UserDefaults } from 'src/app/shared/enums/user-roles';
import { environment } from 'src/environments/environment';
import { OnboardingWelcomeComponent } from '../onboarding-welcome/onboarding-welcome.component';

@Component({
  selector: 'app-on-boarding-profile-modal',
  templateUrl: './on-boarding-profile-modal.component.html',
  styleUrls: ['./on-boarding-profile-modal.component.scss']
})
export class OnBoardingProfileModalComponent implements OnInit {
  imageSrc: string;
  USER_DEFAULTS = UserDefaults;
  uploadPictureForm: FormGroup;
  userDetails: any;
  assetsUrl = environment.S3BUCKET_URL + '/profilePicture/';
  @ViewChild('welcome', { static: true }) welcome: any;
  constructor(public fb: FormBuilder, private service: AuthService, private toastr: ToastrService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.uploadPictureForm = this.fb.group({
      profile: ['']
    });
  }
  get f() {
    return this.uploadPictureForm.controls;
  }
  onFileChange(event: any) {
    const reader = new FileReader();
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
        this.uploadPictureForm.get('profile')!.setValue(file);
        this.uploadImage();
      }
    }
  }
  uploadImage() {
    if (this.uploadPictureForm.value) {
      const formData = new FormData();
      formData.append('file', this.uploadPictureForm.get('profile')!.value);
      this.service.UploadProfileImage(formData).subscribe((res: any) => {
        this.modalService.dismissAll();
        this.modalService.open(OnboardingWelcomeComponent, { centered: true, windowClass: 'custom-modal custom-small-modal', backdrop: 'static' });
      });
    }
}
DismissAll() {
  this.modalService.dismissAll();
  this.service.IsIntialLoginStatus().subscribe(res=>{});
}

}



