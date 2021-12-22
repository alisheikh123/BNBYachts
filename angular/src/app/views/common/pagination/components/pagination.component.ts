import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input() paginationParam = {
    page: 1,
    pageSize: 5
  };
  @Input() totalRecords: number;
  @Output() pageChange: EventEmitter<any> = new EventEmitter();
  @Output() pageSizeChange: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }
  onPageChange() {
    this.pageChange.emit(this.paginationParam);
  }
  onPageSizeChange() {
    this.pageSizeChange.emit(this.paginationParam);
  }
}
