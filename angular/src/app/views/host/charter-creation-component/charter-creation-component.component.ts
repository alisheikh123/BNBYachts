import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-charter-creation-component',
  templateUrl: './charter-creation-component.component.html',
  styleUrls: ['./charter-creation-component.component.scss']
})
export class CharterCreationComponentComponent implements OnInit {

isSubmitted = false;
  constructor(public fb: FormBuilder) { }
  chartercreationForm = this.fb.group({
    boatName: ['', [Validators.required]]
  })
  ngOnInit(): void {
  }
  // get boatList()
  // {
  //   return this.chartercreationForm.get(this.ser);
  // }
  onSubmit(){

  }

}
