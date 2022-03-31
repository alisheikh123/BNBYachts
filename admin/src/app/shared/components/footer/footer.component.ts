import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">
      Created by <b><a href="http://client.bnb.techverxapps.com/" target="_blank">BNBYachts</a></b> 2022
    </span>
  `,
})
export class FooterComponent {
}
