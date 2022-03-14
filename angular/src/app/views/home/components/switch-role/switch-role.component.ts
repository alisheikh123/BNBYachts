import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Roles, UserRoles } from 'src/app/shared/enums/user-roles';
import { utils } from 'src/app/shared/utility/utils';

@Component({
  selector: 'app-switch-role',
  templateUrl: './switch-role.component.html',
  styleUrls: ['./switch-role.component.scss']
})
export class SwitchRoleComponent implements OnInit {
userRoles=UserRoles;
roles=Roles;
  constructor(public router: Router, public activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((res : any) => {
      if(!utils.isEmptyObject(res))
      {
         if(res['switchtype'])
        {
         let type= Number(res['switchtype']);
         switch (type) {
           case 1:
            localStorage.setItem('userRole',this.userRoles.host );
            localStorage.setItem('userRoleName', this.roles.Host);
            this.router.navigate(['/host-dashboard']) .then(() => {
              window.location.reload();
            });
             break;
         case 2:
          localStorage.setItem('userRole',this.userRoles.user );
          localStorage.setItem('userRoleName', this.roles.User);
          this.router.navigate(['']).then(() => {
            window.location.reload();
          });;
          break;
           default:
             break;
         }
        }    
    
      }
      else {
     let  roleType=  localStorage.getItem('userRole');
     if(roleType)
     {
      switch (roleType) {
        case this.userRoles.host:
          this.router.navigate(['/host-dashboard']);
          break;
      case this.userRoles.user:
      this.router.navigate(['']);
      break;
        default:
          break;
      }   
      }
      else {
        localStorage.setItem('userRole',this.userRoles.user );
          localStorage.setItem('userRoleName', this.roles.User);
          this.router.navigate(['']);
      }    
     }
    });
  }

}
