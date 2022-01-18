import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';
import { BoatService } from 'src/app/core/Boat/boat.service';
import { environment } from 'src/environments/environment';
import { UserRoles } from 'src/app/shared/enums/user-roles';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {
  userResponse: any;
  userBoats: any;
  assetsUrl = environment.S3BUCKET_URL + '/boatGallery/';
  USER_ROLE = UserRoles;
  loggedInUserRole: string | null;

  constructor(private authService : AuthService,private boatService : BoatService) { }

  ngOnInit(): void {

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

  // public getUserInfo(): Observable<any[]> {
  //   let response1  = this.authService.getUserInfo();
  //   let response2  = this.boatService.getUserBoats(1,5);
  //   return forkJoin([response1 ,response2]);
  // }
}
