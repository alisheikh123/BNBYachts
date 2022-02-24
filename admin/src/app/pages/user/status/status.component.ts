import { UsersService } from './../../../core/backend/common/services/users.service';
import { Component, Input, OnInit, Output } from '@angular/core';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-status',
  template: '<ui-switch [checked]="value.isActive" color="#004fc4" (change)="onSuspendUser(value.id)"></ui-switch>',
})
export class StatusComponent implements OnInit {

  @Input() value: any;
  constructor(private userService : UsersService, private toaster : NbToastrService) { 
  }
  ngOnInit(): void {
  }
  onSuspendUser(id : string){
    this.userService.SuspendUser(id).subscribe((response: any) => {
      if (response.status == true) {
        this.toaster.primary(response.message , 'User');
      }else
      {
        this.toaster.danger(response.message, 'User');
      }
    });
  }
}
