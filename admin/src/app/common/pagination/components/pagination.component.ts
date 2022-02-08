import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: []
})
export class PaginationComponent implements OnInit {

  @Input() paginationParam = {
    currentPage: 1,
    pageSize: 10
  };
  @Input() totalItems!: number;
  @Output() pageChange: EventEmitter<any> = new EventEmitter();
  @Output() pageSizeChange: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }
  onPageChange(page:number) {
    this.paginationParam.currentPage =page; 
    this.pageChange.emit(this.paginationParam);
  }
  onPageSizeChange() {
    this.pageSizeChange.emit(this.paginationParam);
  }
}
