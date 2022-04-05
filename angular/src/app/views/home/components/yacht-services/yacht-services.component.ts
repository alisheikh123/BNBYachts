import { Router } from '@angular/router';
import { YachtSearchService } from './../../../../core/yacht-search/yacht-search.service';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/shared/interface/NewsLetter';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-yacht-services',
  templateUrl: './yacht-services.component.html',
  styleUrls: ['./yacht-services.component.scss']
})
export class YachtServicesComponent implements OnInit {
  newsLetterForm : FormGroup;
  newsLetter : Contact;
  constructor(private yachtSearchService : YachtSearchService,private fb: FormBuilder, private toastr: ToastrService,private route : Router ) { }

  ngOnInit(): void {
    this.newsLetterForm = this.fb.group(
      {
        id: [ 0, Validators.required, ],
        emailAddress: [
          '',
          Validators.compose([
            Validators.required,
            Validators.pattern(
              '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$'
            ),
            Validators.minLength(3),
            Validators.maxLength(320),
            this.isEmailExistsValidator()
          ]),
        ],
      },
    );
  }
  public isEmailExistsValidator(): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const emailAddress = group;
      if (emailAddress.value && emailAddress.valid) {
        this.yachtSearchService.INewsLetterEmailExist(emailAddress.value).subscribe((res: any) => {
          if (res) {
            emailAddress.setErrors({ emailTaken: true });
          }
          else {
            if (emailAddress.hasError('emailTaken')) {
              emailAddress.setErrors(null);
            }
          }
        });
      }
      return null;
    };
  }
  get newsLetterForms() {
    return this.newsLetterForm.controls;
  }

  submit() {
    var user = this.newsLetterForm.value;
    this.yachtSearchService.AddInNewsLetter(user).subscribe((response: any) => {
      if (response.returnStatus == true) {
        this.toastr.success("Subscribe offers successfully.", "Subscribe User");
        this.resetForm();
      } else {
        this.toastr.warning("Something Wrong !", 'Sorry');
      }
    },
      (error) => {
        console.error('error caught in component')
      }
    );
  }
  resetForm(){
    this.newsLetterForm.reset();
  }
}
