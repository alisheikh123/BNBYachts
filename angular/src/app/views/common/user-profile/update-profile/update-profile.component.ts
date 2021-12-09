import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent implements OnInit {
  userid: any;
  profileForm: FormGroup;
  hasError: boolean;
  userResponse: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,  
    private authService : AuthService  ,
    private toasterService : ToastrService
    ) { }

  ngOnInit(): void {
    this.userid = this.activatedRoute.snapshot.params["id"];
    this.getUserData();
    // initialize the form
    this.initForm();
  }

  getUserData(){
    this.authService.getUserInfo().subscribe((res: any) => {
      localStorage.setItem('userProfile',JSON.stringify(res));
      this.userResponse = res;
    });
  }
  initForm() {
    var oldUser = JSON.parse(localStorage.getItem('userProfile') || '{}');
    this.profileForm = this.fb.group(
      {
        Name: [
          oldUser.name,
          Validators.required,
        ],
        About: [
          oldUser.about,
          Validators.required,
        ],
        PhoneNumber: [oldUser.phoneNumber, Validators.compose([Validators.required])],
        Email: [
          oldUser.email,
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
    // Get form fields
    get formValues() {
      return this.profileForm.controls;
    }

    submit() {
      debugger
      this.hasError = false;
      var user = this.profileForm.value;
      this.authService.updateUserProfile(user).subscribe((result: any) => {
        if (result == true) {
          this.toasterService.warning('Profile updated successfuly');
          this.getUserData();
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
}
