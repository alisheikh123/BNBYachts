import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'ngx-action-list',
  template:  `<div ngbDropdown class="d-inline-block" container="body">
  <button class="btn btn-default" id="dropdownBasic2" ngbDropdownToggle ><i class="fas fa-ellipsis-v"></i></button>
  <div ngbDropdownMenu aria-labelledby="dropdownBasic2">
    <button ngbDropdownItem (click)="onAction($event)" value="onEditAction">Edit</button>
    <button ngbDropdownItem (click)="onAction($event)" value="onDeleteAction">Delete</button>
  </div>
</div>`,
styleUrls : ['./action-list.component.scss'],

})
export class ActionListComponent implements OnInit {
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
