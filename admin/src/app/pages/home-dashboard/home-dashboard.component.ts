import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserRoles } from '../../shared/enums/userRoles';
import { BoatUserData } from '../../shared/interfaces/BoatUser';
import { DisputesData } from '../../shared/interfaces/IDispute';
import { IUser } from '../../shared/interfaces/totalUsers';



@Component({
  selector: 'app-home-dashboard',
  templateUrl: './home-dashboard.component.html',
  styleUrls: ['./home-dashboard.component.scss']
})

export class HomeDashboardComponent implements OnInit{
  totalUser : IUser;
  Roles = UserRoles;
  constructor(private userService : BoatUserData, private disputeService : DisputesData ,public router: Router) {

}
  ngOnInit(): void {
    this.getTotalUser(this.Roles.USER,this.Roles.HOST);
  }
  
  private alive = true;
  ngOnDestroy() {
    this.alive = false;
  }

  getTotalUser(userRole : string, hostRole : string ){
    this.userService.getTotalUsers(userRole,hostRole).subscribe((res: any) => {
      this.totalUser = res;
      this.disputeService.getDisputesData().subscribe((res: any) => {
        this.totalUser.disputes = res?.length;
      })
    })
  }
}
