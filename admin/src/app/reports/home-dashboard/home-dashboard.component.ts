import { PaginationSettingsEnum } from './../../shared/pagination/PaginationSettingsEnum';
import { Pagination } from './../../models/pagination';
import { DisputeService } from './../../services/site/dispute.service';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { IUser } from 'src/app/shared/interfaces/totalUsers';
import { UserRoles } from 'src/app/shared/enums/userRoles';
@Component({
  selector: 'app-home-dashboard',
  templateUrl: './home-dashboard.component.html',
  styleUrls: ['./home-dashboard.component.css']
})

export class HomeDashboardComponent implements OnInit{
  totalUser! : IUser;
  Roles = UserRoles;
  searchTerm!: string;
  pagination!: Pagination;
  paginationEnum = PaginationSettingsEnum;
  constructor(private userService : UserService,private disputeService : DisputeService, public router: Router, public app: AppComponent){
  }

  ngOnInit(): void {
    this.getTotalUser(this.Roles.USER,this.Roles.HOST);
  }
  getTotalUser(userRole : string, hostRole : string ){
    this.userService.getTotalUsers(userRole,hostRole).subscribe((res: any) => {
      this.totalUser = res;
      var searchModel = {
        searchTerm: (this.searchTerm != undefined) ? this.searchTerm : "" ,
        pageNumber: (this.pagination != null) ? this.pagination.pageNumber : this.paginationEnum.pageNumber,
        pageSize: (this.pagination != null) ? this.pagination.pageSize : this.paginationEnum.pageSize,
      };
      this.disputeService.getDisputeList(searchModel).subscribe((res: any) => {
        this.totalUser.disputes = res?.totalCount;
      })
    })
  }
}
