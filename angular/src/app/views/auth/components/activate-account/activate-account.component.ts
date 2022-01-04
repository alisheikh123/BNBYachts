import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { PaymentsService } from 'src/app/core/Payment/payments.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.scss'],
})
export class ActivateAccountComponent implements OnInit {
  username: any;
  token: any;
  dynamicMessage: string = 'Processing...';
  userData: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private paymentService: PaymentsService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.username = this.activatedRoute.snapshot.queryParams.username;
    this.token = this.activatedRoute.snapshot.queryParams.id;
    this.authService.getUserInfoByUserName(this.username).subscribe((res:any)=>{
      this.userData = res;
      this.ConfirmAccont(this.username, this.token);
    })
  }

  ConfirmAccont(username: string, token: string) {
    this.authService
      .confirmEmail(username, token)
      .subscribe((response: any) => {
        if (response == true) {
          this.dynamicMessage = 'Account activated successfuly.';
          let customerData = {
            id: this.userData.id,
            name : this.userData.name,
            email: this.username
          }
          this.paymentService.createCustomer(customerData).subscribe((res:any)=>{
          })
          this.toastr.success(this.dynamicMessage, 'success',{
            timeOut: 5000
          });
        } else {
          this.dynamicMessage = 'Account activation failed.';
        }
      });
  }
}
