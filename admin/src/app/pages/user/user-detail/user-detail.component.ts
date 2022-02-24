import { BoatUser, BookingReview } from './../../../shared/interfaces/BoatUser';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { BoatUserData } from '../../../shared/interfaces/BoatUser';
import { environment } from '../../../../environments/environment';
import { UserDefaults } from '../../../shared/enums/userRoles';
import { DatePipe } from '@angular/common';
import { BoatsData } from '../../../shared/interfaces/Boats';

@Component({
  selector: 'ngx-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  userResponse : BoatUser;
  latest_date : string;
  userReview : BookingReview[];
  assetsUrl = environment.S3BUCKET_URL + '/boatGallery/';
  assetsUrlProfile = environment.S3BUCKET_URL + '/profilePicture/';
  USER_DEFAULTS  = UserDefaults;
  constructor(private userService : BoatUserData,private boatsService : BoatsData, private route : ActivatedRoute, private datePipe : DatePipe) { }
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.UserDetail(id);
    this.UserReviews(id);
  }
  UserDetail(id : string){
    this.userService.getUserInfoById(id).subscribe((res) =>{
      this.latest_date =this.datePipe.transform(new Date( res?.creationTime), 'yyyy-MM-dd');
      this.userResponse = res;
    }); 
  }
  UserReviews(reviewerId : string){
    this.userService.getReviewByUserId(reviewerId).subscribe((res) =>{
      this.userReview = res;
      res.forEach((elem: any) => {
        this.userService.getUserInfoById(elem.reviewerId).subscribe((userDetails: any) => {
          elem.userDetails = userDetails;
        });
      });
    }); 
  }
}
