import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from 'src/app/core/translate.service';

@Pipe({
  name: 'localization',
  pure: false
})

export class LocalizationPipe implements PipeTransform {
  constructor(private translate: TranslateService) { }
  transform(key: any): any {
    return this.translate.data[key] || key;
  }
}
