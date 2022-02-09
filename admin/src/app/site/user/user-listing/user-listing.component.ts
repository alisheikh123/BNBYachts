import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { UserService } from 'src/app/services/user.service';
import { UserRoles } from 'src/app/shared/enums/userRoles';
import { BoatUser } from 'src/app/shared/interfaces/BoatUser';
import { PaginationSettingsEnum } from 'src/app/shared/pagination/PaginationSettingsEnum';

@Component({
  selector: 'app-user-listing',
  templateUrl: './user-listing.component.html'
})

export class UserListingComponent implements OnInit {
  Roles = UserRoles;
  user!: BoatUser[];
  public pageNumber!: number;
  public pageSize!: number;
  public totalItems!: number;
  public searchTerm! : string;
  pagination = PaginationSettingsEnum;
  constructor(public app: AppComponent, private userService: UserService) {
  }
  ngOnInit(): void {
    this.filter(false);
  }
  filter(reset: boolean) {
    debugger;
    if (reset) {
      this.searchTerm = "";
    }

    var searchModel = {
      searchTerm: (this.searchTerm != undefined) ? this.searchTerm : "" ,
      pageNumber: (this.pageNumber != null) ? this.pageNumber : this.pagination.pageNumber,
      pagesize: (this.pageSize != null) ? this.pageSize : this.pagination.pageSize,
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
