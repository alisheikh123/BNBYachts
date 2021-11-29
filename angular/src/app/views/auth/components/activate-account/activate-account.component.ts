import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.scss']
})
export class ActivateAccountComponent implements OnInit {
  username: any;
  token: any;
  dynamicMessage:string = "Processing...";

  constructor(private router: Router, private activatedRoute: ActivatedRoute,private authService : AuthService) { }

  ngOnInit(): void {
    this.username = this.activatedRoute.snapshot.queryParams.username;
    this.token = this.activatedRoute.snapshot.queryParams.id;
    this.ConfirmAccont(this.username,this.token)
  }

  ConfirmAccont(username:string,token:string){
 this.authService.confirmEmail(username,token).subscribe((response: any) => {
  if ((response == true)) {
   this.dynamicMessage = "Account activated successfuly."
  }
  else {
    this.dynamicMessage = "Account activation failed."
  }
});
  }
}
