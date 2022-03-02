import { Reviews } from 'src/app/shared/interface/reviews';
import { find } from 'rxjs/operators';
import { BookingService } from 'src/app/core/Booking/booking.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';
import { BoatService } from 'src/app/core/Boat/boat.service';
import { environment } from 'src/environments/environment';
import { Roles, UploadDefault, UserRoles } from 'src/app/shared/enums/user-roles';
import { OnBoardingModalComponent } from '../../on-boarding-modal/on-boarding-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserDetails } from 'src/app/shared/interface/UserDetails';
import { UserBoats } from 'src/app/shared/interface/UserBoats';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {
  userResponse: UserDetails;
  userBoats: Array<UserBoats>;
  totalReviews : number;
  userReview : Array<Reviews> = [];
  hostReviews :Array<Reviews> = [];
  assetsUrl = environment.S3BUCKET_URL + '/boatGallery/';
  assetsUrlProfile = environment.S3BUCKET_URL + '/profilePicture/';
  USER_ROLE = UserRoles;
  roles = Roles;
  USER_DEFAULTS = UploadDefault;
  loggedInUserRole: string | null;
  uploadPictureForm: FormGroup;
  imageSrc: string;
  uploadDefault = UploadDefault;
  constructor(private authService : AuthService,private boatService : BoatService,private bookingService : BookingService,private modal:NgbModal,public fb:FormBuilder) { }

  ngOnInit(): void {
    this.uploadPictureForm = this.fb.group({
      profile: ['']
    });
    this.authService.getUserInfo().subscribe((res : any)=>{
      this.userResponse = res;
      this.GetReviews(this.userResponse.id)
      this.loggedInUserRole = localStorage.getItem('userRole');
      if(this.loggedInUserRole == this.USER_ROLE.host){
        this.boatService.getUserBoats(1,5).subscribe((res : any)=>{
          this.userBoats = res;
        })
      }
    })
  }
  get f() {
    return this.uploadPictureForm.controls;
  }
  GetReviews(revieweeId : string){
    this.bookingService.getReviewByUserId(revieweeId).subscribe((res: any)=>{
      this.totalReviews = res?.length;
      res.forEach((review: any) => {
        res.forEach((elem : any)=> {
          this.authService.getUserInfoById(elem.reviewerId).subscribe((userDetails: any) => {
            elem.userDetails = userDetails;
          });
        });
        this.authService.IsRoleName(review.reviewerId, this.roles.User, this.roles.Host).subscribe(data => {
          switch (data) {
            case 0:
              this.userReview?.push(review);
              this.hostReviews?.push(review);
              break;
            case 1:
              this.userReview?.push(review);
              break;
            case 2:
              this.hostReviews?.push(review);
              break;
          }
        })
      });
    })
  }
  verifyPhoneNumber()
  {
    this.modal.open(OnBoardingModalComponent, { centered: true, windowClass: 'custom-modal custom-small-modal',backdrop:'static' });
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
