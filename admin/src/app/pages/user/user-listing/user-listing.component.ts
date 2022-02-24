import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserRoles } from '../../../shared/enums/userRoles';
import { BoatUser, BoatUserData } from '../../../shared/interfaces/BoatUser';
import { NbDialogService } from '@nebular/theme';
import { StatusComponent } from '../status/status.component';

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
      custom: [
      { 
        name: 'userDetails', 
        title: '<i class="nb-compose"></i>' 
      }],
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
      phoneNumber: {
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
     isActive: {
        title: 'Status',
        type: 'custom',
        filter: false,
        renderComponent: StatusComponent,
        valuePrepareFunction: (value, row, cell) => {
            return row;
        },
      },
  }
};
  constructor(private userService: BoatUserData , private datePipe : DatePipe, private router : Router, private dialogService : NbDialogService) {
   
  }
  ngOnInit() {
  this.filter();
   }
  filter() {
    this.userService.getBoatUsers(this.Roles.USER).subscribe((res) =>{
      this.source = res;
    });    
  }
  onCustomAction(event){
    this.router.navigate([`pages/user/users/${event.data.id}`]);
  }
}
