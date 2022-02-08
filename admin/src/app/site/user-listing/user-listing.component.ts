import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { UserRoles } from 'src/app/shared/enums/userRoles';

@Component({
  selector: 'app-user-listing',
  templateUrl: './user-listing.component.html'
})

export class UserListingComponent implements OnInit {
  Roles = UserRoles;
  public user!: any[];
  public pageNumber!: number;
  public pageSize!: number;
  public totalItems!: number;
  public searchTerm! : string;

  constructor(public app: AppComponent, private userService: UserService) {
  }
  ngOnInit(): void {
    this.filter(false);
  }
  filter(reset: boolean) {
    if (reset) {
      this.searchTerm = "";
    }

    var searchModel = {
      searchTerm: (this.searchTerm != undefined) ? this.searchTerm : "" ,
      pageNumber: (this.pageNumber != null) ? this.pageNumber : 1,
      pagesize: (this.pageSize != null) ? this.pageSize : 10,
    };

    this.userService.getBoatsUser(this.Roles.USER,searchModel).subscribe((res: any)  => {
      this.user = res.data;
      this.pageNumber = res.pageNumber;
      this.pageSize = res.pageSize;
      this.totalItems = res.totalCount;
    });
  }
  pageChanged(event: any): void {
    this.pageNumber = event.page;
    this.filter(false);
  }
}
