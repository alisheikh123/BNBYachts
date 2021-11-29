import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.scss']
})
export class ConfirmEmailComponent implements OnInit {
@Input() public username: any;
  constructor(
    public authService: AuthService,
    public toaster: ToastrService
  ) { }

  ngOnInit(): void {
  }
  resendLink(){
    this.authService.resendEmail(this.username).subscribe((response: any) => {
      if ((response == true)) {
        this.toaster.success('Email sent successfuly');
      }
      else {
        this.toaster.error('Error occured while sending email');
      }
    });;
  }
}
