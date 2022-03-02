import { BoatUser, BookingReview } from './../../../shared/interfaces/BoatUser';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { UserDefaults } from '../../../shared/enums/userRoles';
import { BoatUserData } from '../../../shared/interfaces/BoatUser';
import { BoatsData, BoatsDetail } from '../../../shared/interfaces/Boats';

@Component({
  selector: 'ngx-host-detail',
  templateUrl: './host-detail.component.html',
  styleUrls: ['./host-detail.component.scss']
})
export class HostDetailComponent implements OnInit {
  userResponse : BoatUser;
  userReview : BookingReview[];
  userBoats : BoatsDetail[];
  latest_date : string;
  assetsUrl = environment.S3BUCKET_URL + '/boatGallery/';
  assetsUrlProfile = environment.S3BUCKET_URL + '/profilePicture/';
  USER_DEFAULTS  = UserDefaults;
  constructor(private userService : BoatUserData ,private boatsService : BoatsData, private route : ActivatedRoute, private datePipe : DatePipe) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.UserDetail(id);
    this.UserReviews(id);
    this.GetHostBoats(id);
  }
  UserDetail(id : string){
    this.userService.getUserInfoById(id).subscribe((res) =>{
      this.latest_date =this.datePipe.transform(new Date( res?.creationTime), 'yyyy-MM-dd');
      this.userResponse = res;
    }); 
  }
  GetHostBoats(userId : string){
    this.boatsService.getBoatsByUserId(userId).subscribe((res) =>{
      this.userBoats = res;
    }); 
  }
  UserReviews(reviewerId : string){
    this.userService.getReviewByUserId(reviewerId).subscribe((res : any) =>{
      this.userReview = res;
      res.forEach((elem: any) => {
        this.userService.getUserInfoById(elem.reviewerId).subscribe((userDetails: any) => {
          elem.userDetails = userDetails;
        });
      });
    }); 
  }
}
