import { UsersService } from './../../../core/backend/common/services/users.service';
import { Component, Input, OnInit, Output } from '@angular/core';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {

  @Input() value: any;
  constructor(private userService : UsersService, private toaster : NbToastrService) { 
  }
  ngOnInit(): void {
  }
  onSuspendUser(id : string){
    this.userService.SuspendUser(id).subscribe((response: any) => {
      // if (response.status == true) {
        this.toaster.success('User Suspended/Active Succesfully', 200);
      // }else
      // {
      //   this.toaster.danger('User Suspended/Active Succesfully');
      // }
    });
  }
}
