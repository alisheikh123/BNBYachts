import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-action-list',
  template: '<div class="btn-group"><button type="button" class="btn btn-danger dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Action</button><div class="dropdown-menu"><a class="dropdown-item" href="#">Action</a><a class="dropdown-item" href="#">Another action</a></div></div>',
})
export class ActionListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
