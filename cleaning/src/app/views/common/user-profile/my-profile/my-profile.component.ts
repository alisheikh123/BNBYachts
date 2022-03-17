import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';
import { BoatService } from 'src/app/core/Boat/boat.service';
import { environment } from 'src/environments/environment';
import { UploadDefault, UserRoles } from 'src/app/shared/enums/user-roles';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {
  userResponse: any;
  userBoats: any;
  assetsUrl = environment.S3BUCKET_URL + '/boatGallery/';
  assetsUrlProfile = environment.S3BUCKET_URL + '/profilePicture/';
  USER_ROLE = UserRoles;
  USER_DEFAULTS = UploadDefault;
  loggedInUserRole: string | null;
  uploadPictureForm: FormGroup;
  imageSrc: string;
  uploadDefault = UploadDefault;
  constructor(private authService : AuthService,private boatService : BoatService,private modal:NgbModal,public fb:FormBuilder) { }

  ngOnInit(): void {
    this.uploadPictureForm = this.fb.group({
      profile: ['']
    });
    this.authService.getUserInfo().subscribe(res=>{
      this.userResponse = res;
      this.loggedInUserRole = localStorage.getItem('userRole');
      if(this.loggedInUserRole == this.USER_ROLE.host){
        this.boatService.getUserBoats(1,5).subscribe(res=>{
          this.userBoats = res;
        })
      }
    })
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
        this.userResponse.imagePath = '';
        this.uploadPictureForm.get('profile')!.setValue(file);
        this.uploadImage();
      }
    }
  }
  uploadImage() {
    if (this.uploadPictureForm.value) {
      const formData = new FormData();
      formData.append('file', this.uploadPictureForm.get('profile')!.value);
      this.authService.UploadProfileImage(formData).subscribe((res: any) => {
      });
    }
}

}
