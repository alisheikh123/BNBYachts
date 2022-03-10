import { DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../../../../environments/environment';
import { UserDefaults } from '../../../shared/enums/userRoles';
import {  BoatUser, BoatUserData } from '../../../shared/interfaces/BoatUser';

@Component({
  selector: 'ngx-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  userResponse : BoatUser;
  uploadPictureForm : FormGroup;
  userForm: FormGroup;
  adminImage : string;
  latest_date : string;
  profile : string;
  assetsUrl = environment.S3BUCKET_URL + '/boatGallery/';
  assetsUrlProfile = environment.S3BUCKET_URL + '/profilePicture/';
  USER_DEFAULTS  = UserDefaults;
  @Output() profileImage = new EventEmitter<any>();
  constructor(private userService : BoatUserData,private fb : FormBuilder, private route : ActivatedRoute, private datePipe : DatePipe, private modalService : NgbModal, private toaster : NbToastrService) { }
  ngOnInit(): void {
    this.uploadPictureForm = this.fb.group({
      profile: ['']
    });
    this.userForm = this.fb.group({
      id : [0],
      imagePath: ['', Validators.required],
      email: ['', Validators.required],
      name: ['', Validators.required],
      phoneNumber: ['',Validators.required],
      about : ['']
    })
    const id = this.route.snapshot.paramMap.get('id');
    this.UserDetail(id);
  }
  get citiesForm() {
    return this.userForm.controls;
  }
  openLg(content) {
    this.modalService.open(content, { size: 'lg' });
    this.userForm.patchValue({
      id : this.userResponse.id,
      name : this.userResponse.name,
      email : this.userResponse.email,
      about : this.userResponse.about,
      phoneNumber : this.userResponse.phoneNumber,
    })
  }
  UserDetail(id : string){
    this.userService.getUserInfoById(id).subscribe((res) =>{
      this.latest_date =this.datePipe.transform(new Date( res?.creationTime), 'yyyy-MM-dd');
      this.userResponse = res;
    }); 
  }
  onSubmit() {
    var usersData = this.userForm.value;
    if (usersData.id > 0 || usersData.id != null) {
      this.userService.UpdateAdminProfile(usersData).subscribe(response =>{
      this.toaster.primary('Profile updated successfully', 'Profile');
      this.resetForm();
      this.modalService.dismissAll();
      this.UserDetail(usersData.id);
      });
    }
  }
  onFileChange(event: any) {
    debugger;
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.adminImage = reader.result as string;
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
      this.userService.UpdateProfilePicture(formData).subscribe((res: any) => {
        this.profileImage.emit(this.uploadPictureForm.value);
      });
    }
  }
  resetForm(){
    this.userForm.reset();
  }
}