import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import { TranslateService } from 'src/app/core/translate.service';

@Pipe({
  name: 'datemonthformat',
  pure: false
})

export class DateMonthFormatPipe implements PipeTransform {
  constructor() { }
  transform(date: Date): any {
    return moment(date).format("MMM D YY");
  }
}



