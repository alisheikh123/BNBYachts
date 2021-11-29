import { Component, Input, OnInit } from '@angular/core';
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
  ) { }

  ngOnInit(): void {
  }
  resendLink(){
    debugger
    this.authService.resendEmail(this.username).subscribe((response: any) => {
      if ((response == true)) {
        Swal.fire('Success','Email sent successfuly' , 'success');
      }
      else {
        Swal.fire('Error','An error has been occured' , 'error');
      }
    });;
  }
}
