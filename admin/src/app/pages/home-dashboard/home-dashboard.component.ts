import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators';
import { SolarData } from '../../core/data/solar';
import { BoatUserData } from '../../core/interfaces/common/users';
import { UserRoles } from '../../shared/enums/userRoles';
import { DisputesData } from '../../shared/interfaces/IDispute';
import { IUser } from '../../shared/interfaces/totalUsers';
import { PaginationSettingsEnum } from '../../shared/pagination/PaginationSettingsEnum';



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

  getTotalUser(userRole : string, hostRole : string ){
    this.userService.getTotalUsers(userRole,hostRole).subscribe((res: any) => {
      this.totalUser = res;
      this.disputeService.getDisputesData().subscribe((res: any) => {
        this.totalUser.disputes = res?.length;
      })
    })
  }
}
