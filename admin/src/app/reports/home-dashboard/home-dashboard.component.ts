import { Pagination } from './../../models/pagination';
import { DisputeService } from './../../services/site/dispute.service';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { totalUsers } from 'src/app/shared/interfaces/totalUsers';
import { UserRoles } from 'src/app/shared/enums/userRoles';
@Component({
  selector: 'app-home-dashboard',
  templateUrl: './home-dashboard.component.html',
  styleUrls: ['./home-dashboard.component.css']
})

export class HomeDashboardComponent implements OnInit{
  totalUser! : totalUsers;
  Roles = UserRoles;
  searchTerm!: string;
  pagination!: Pagination;
  userDetails: any;
  isLoggedIn!: boolean;
  constructor(private userService : UserService,private disputeService : DisputeService, public router: Router, public app: AppComponent){
  }

  ngOnInit(): void {
    this.getTotalUser(this.Roles.USER,this.Roles.HOST);
    this.getDisputeList();
  }
  getTotalUser(userRole : string, hostRole : string ){
    this.userService.getTotalUsers(userRole,hostRole).subscribe((res: any) => {
      this.totalUser = res;
    })
  }
  getDisputeList(){
    var searchModel = {
      searchTerm: (this.searchTerm != undefined) ? this.searchTerm : "" ,
      pageNumber: (this.pagination != null) ? this.pagination.pageNumber : 1,
      pageSize: (this.pagination != null) ? this.pagination.pageSize : 10,
    };
    this.disputeService.getDisputeList(searchModel).subscribe((res: any) => {
      this.totalUser.disputes = res?.totalCount;
    })
  }
}
