import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-host-listing',
  templateUrl: './host-listing.component.html'
})

export class HostListingComponent implements OnInit {
  pagination : any;
  public user!: any[];
  public roleName!: string;
  public pageNumber: any;
  public pageSize: any;
  public searchTerm! : string;
  public totalItems: any;

  constructor(public app: AppComponent, private userService: UserService) {
  }
  ngOnInit(): void {
    this.filter(false);
  }
  filter(reset: boolean) {
    this.roleName = "HOST";
    if (reset) {
      this.searchTerm = "";
      this.pagination = null;
    }

    var searchModel = {
      searchTerm: (this.searchTerm != undefined) ? this.searchTerm : "" ,
      pageNumber: (this.pagination != null) ? this.pagination.pageNumber : 1,
      pagesize: (this.pagination != null) ? this.pagination.pageSize : 10,
    };

    this.userService.getBoatsUser(this.roleName,searchModel).subscribe((res: any)  => {
      this.user = res.data;
      this.pageNumber = res.pageNumber;
      this.pageSize = res.pageSize;
      this.totalItems = res.totalCount;
    });
  }

  pageChanged(event: any): void {
    this.pagination.pageNumber = event.page;
    this.filter(false);
  }
}
