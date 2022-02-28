import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HelpCenterService } from 'src/app/core/help-center/help-center.service';

@Component({
  selector: 'app-contact-us-form',
  templateUrl: './contact-us-form.component.html',
  styleUrls: ['./contact-us-form.component.scss']
})
export class ContactUsFormComponent implements OnInit {
  contactUsForm: FormGroup;
  isSubmitted: boolean = false;
  
  constructor(private service: HelpCenterService, private fb: FormBuilder, private toastr: ToastrService) {

  }
  ngOnInit(): void {
    this.contactUsForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.compose([
        Validators.required,
        Validators.pattern(
          '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$'
        )])],
      message: ['', Validators.required],
      fileName: [null],
      fileAttachment: [null],
      filePath:[]
    });
  }

  get f() {
    return this.contactUsForm.controls;
  }

  onFileChoose(fileInput: any) {
    let fileData: File;
    fileData = <File>fileInput.target.files[0];
    var mimeType = fileData.type;
    var reader = new FileReader();
    reader.readAsDataURL(fileData);
    reader.onload = (_event) => {
      this.f.fileName.setValue(fileData.name);
      let result = reader.result?.toString().split('base64,')[1];
      this.f.fileAttachment.setValue(result);
    }
  }

  send() {
    this.isSubmitted = true;
    if (this.contactUsForm.valid) {
      this.service.send(this.contactUsForm.value).subscribe(res => {
        this.isSubmitted = false;
        this.contactUsForm.reset();
        this.toastr.success("Message sent to admin.", "Help Center");
      })
    }
  }
}