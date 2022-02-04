import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExcerptPipe } from './excerpt.pipe';
import { GetValueByKeyPipe } from './get-value-by-key.pipe';
import { RelativeTimePipe } from './relative-time.pipe';
import { FilterByPipe } from './filterBy.pipe';
import { SafeHtmlPipe } from './safe.pipe';
import { FileTypePipe } from './file-type-icon.pipe';
import { MySlicePipe } from './my-slice.pipe';
import { LocalizationPipe } from './localization.pipe';
import { SearchFilterPipe } from './search.pipe';
import { GroupByPipe } from './group-by.pipe';
import { FormatTimePipe } from './Format-Time.pip';
const pipes = [
  ExcerptPipe,
  GetValueByKeyPipe,
  RelativeTimePipe,
  FilterByPipe,
  SafeHtmlPipe,
  FileTypePipe,
  MySlicePipe,
  LocalizationPipe,
  SearchFilterPipe,
  GroupByPipe,
  FormatTimePipe
];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: pipes,
  exports: pipes
})
export class SharedPipesModule { }
