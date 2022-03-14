import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'yearformat',
  pure: false
})

export class YearFormatPipe implements PipeTransform {
  constructor() { }
  transform(date: Date): any {
    return moment(date).format("YYYY");
  }
}

