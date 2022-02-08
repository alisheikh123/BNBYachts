import { Pagination } from './../../models/pagination';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import 'bootstrap/dist/js/bootstrap.bundle';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-user-listing',
  templateUrl: './user-listing.component.html'
})

export class UserListingComponent implements OnInit {
  pagination! : any;
  public user!: any[];
  public roleName!: string;
  public pageNumber: any;
  public pageSize: any;
  public totalItems: any;
  public searchTerm! : string;

  constructor(public app: AppComponent, private userService: UserService) {
  }
  ngOnInit(): void {
    this.filter(false);
  }
  filter(reset: boolean) {
    this.roleName = "USER";
    if (reset) {
      this.searchTerm = "";
    }

    var searchModel = {
      searchTerm: (this.searchTerm != undefined) ? this.searchTerm : "" ,
      pageNumber: (this.pagination != null) ? this.pagination.pageNumber : 1,
      pagesize: (this.pagination != null) ? this.pagination.pageSize : 10,
    };

    this.userService.getBoatsUser(this.roleName,searchModel).subscribe((res: any)  => {
      this.user = res.data;
      this.pagination.pageNumber = res.pageNumber;
      this.pagination.pageSize = res.pageSize;
      this.pagination.totalItems = res.totalCount;
    }, error => console.error(error));
  }
  pageChanged(event: any): void {
    this.pageNumber = event.page;
    this.filter(false);
  }
}
