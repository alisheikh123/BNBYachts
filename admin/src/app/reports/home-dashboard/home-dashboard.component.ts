import { Pagination } from './../../models/pagination';
import { DisputeService } from './../../services/site/dispute.service';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
@Component({
  selector: 'app-home-dashboard',
  templateUrl: './home-dashboard.component.html',
  styleUrls: ['./home-dashboard.component.css']
})

export class HomeDashboardComponent implements OnInit{
  totalUser: any;
  disputes : any;
  hostRole! : string;
  userRole! : string;
  searchTerm!: any;
  pagination!: Pagination;
  userDetails: any;
  isLoggedIn: boolean | any;
  constructor(private userService : UserService,private disputeService : DisputeService, public router: Router, public app: AppComponent){
  }

  ngOnInit(): void {
    this.hostRole = "HOST",
    this.userRole = "USER",
    this.getTotalUser(this.userRole ,this.hostRole);
    this.getDisputeList();
  }
  getTotalUser(userRole:any, hostRole:any ){
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
      this.disputes = res?.totalCount;
    })
  }
}
