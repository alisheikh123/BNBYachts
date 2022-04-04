import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'ngx-signle-action',
  template:  `<div ngbDropdown class="d-inline-block" container="body">
  <button class="btn btn-default" id="dropdownBasic2" ngbDropdownToggle ><i class="fas fa-ellipsis-v"></i></button>
  <div ngbDropdownMenu aria-labelledby="dropdownBasic2">
    <button ngbDropdownItem (click)="onAction($event)" value="onViewAction">View</button>
  </div>
</div>`,
styleUrls : ['./signle-action.component.scss'],

})
export class SignleActionComponent implements OnInit {
  value : string;
  @Input() rowData: any;

  @Output() actionEmitter: EventEmitter<any> = new EventEmitter();
  @Output() dataEmitter: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }
  onAction(event:any){
    this.actionEmitter.emit(event.target.value);
    this.dataEmitter.emit(this.rowData);
  }
}

