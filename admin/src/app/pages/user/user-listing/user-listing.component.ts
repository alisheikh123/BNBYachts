import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BoatUserData } from '../../../core/interfaces/common/users';
import { UserRoles } from '../../../shared/enums/userRoles';
import { BoatUser } from '../../../shared/interfaces/BoatUser';

@Component({
  selector: 'app-user-listing',
  templateUrl: './user-listing.component.html',
  styleUrls: ['./user-listing.component.scss']
})

export class UserListingComponent implements OnInit {
  Roles = UserRoles;
  source: BoatUser[];
  settings = {
    actions: {
      add: false,
      edit:false,
      delete: false,
      position: 'right',
      custom: [{ 
        name: 'Detail', 
        title: '<i class="nb-compose"></i>' }],
    },
    columns: {
      name: {
        title: 'Name',
        type: 'string',
      },
      email: {
        title: 'Email',
        type: 'string',
      },
      phone: {
        title: 'Phone',
        type: 'string',
      },
      phoneNumberConfirmed: {
        title: 'Phone Verified',
        type: 'boolean',
      },
      creationTime: {
        title: 'Joining Date',
        type: 'Date',
        valuePrepareFunction: (created) => {
          return this.datePipe.transform(new Date(created), 'MM/dd/yyyy');
      },
    },
  }
};
  constructor(private userService: BoatUserData , private datePipe : DatePipe) {
   
  }
  ngOnInit() {
  this.filter();
   }
  filter() : any {
    this.userService.getBoatUsers(this.Roles.USER).subscribe((res) =>{
      this.source = res;
    });    
  }
}
