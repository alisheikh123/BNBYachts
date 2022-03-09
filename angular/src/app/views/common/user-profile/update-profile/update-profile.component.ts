import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { Roles, UploadDefault, UserRoles } from 'src/app/shared/enums/user-roles';
import { BoatService } from 'src/app/core/Boat/boat.service';
import { BookingService } from 'src/app/core/Booking/booking.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OnBoardingModalComponent } from '../../on-boarding-modal/on-boarding-modal.component';
import { UserBoats } from 'src/app/shared/interface/UserBoats';
import { Reviews } from 'src/app/shared/interface/reviews';


@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent implements OnInit {
  userid: any;
  userBoats: Array<UserBoats>;
  totalReviews : number;
  profileForm: FormGroup;
  hasError: boolean;
  userResponse: any;
  assetsUrlProfile = environment.S3BUCKET_URL + '/profilePicture/';
  imageSrc: string;
  USER_DEFAULTS = UploadDefault;
  uploadPictureForm: FormGroup;
  loggedInUserRole: string | null;
  USER_ROLE = UserRoles;
  userReview : Array<Reviews> = [];
  hostReviews :Array<Reviews> = [];
  roles = Roles;
  @Output() profileImage = new EventEmitter<any>();
  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private authService : AuthService  ,
    private toasterService : ToastrService,
    private router: Router,private boatService : BoatService,private bookingService : BookingService,private modal:NgbModal
    ) { }

  ngOnInit(): void {
    this.userid = this.activatedRoute.snapshot.params["id"];
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
    this.getUserData();
  }

  getUserData(){
    this.authService.getUserInfo().subscribe((res: any) => {
      //localStorage.setItem('userProfile',JSON.stringify(res));
      this.userResponse = res;
      this.initForm();
    });
  }
  initForm() {
    this.profileForm = this.fb.group(
      {
        Name: [
          this.userResponse.name,
          Validators.required,
        ],
        About: [
          this.userResponse.about,
          Validators.required,
        ],
        PhoneNumber: [this.userResponse.phoneNumber, Validators.compose([Validators.required])],
        Email: [
          this.userResponse.email,
          Validators.compose([
            Validators.required,
            Validators.pattern(
              '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$'
            ),
            Validators.minLength(3),
            Validators.maxLength(320),
          ]),
        ],
      },
    );
  }
    get formValues() {
      return this.profileForm.controls;
    }

    submit() {
      this.hasError = false;
      var user = this.profileForm.value;
      this.authService.updateUserProfile(user).subscribe((result: any) => {
        if (result == true) {
          this.toasterService.success('Profile updated successfuly');
          this.getUserData();
          this.router.navigateByUrl('/');
        } else {
          this.hasError = true;
          this.toasterService.warning('Sorry');
        }
      },
       (error) => {                              //Error callback
        console.error('error caught in component')
        this.hasError = true;
      }
      );
    }
    verifyPhoneNumber()
    {
      this.modal.open(OnBoardingModalComponent, { centered: true, windowClass: 'custom-modal custom-small-modal',backdrop:'static' });
    }
    onFileChange(event: any) {

      if (event.target.files.length > 0) {
        const file = event.target.files[0];
        const reader = new FileReader();
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
          this.profileImage.emit(this.uploadPictureForm.value);
        });

      }
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
}
