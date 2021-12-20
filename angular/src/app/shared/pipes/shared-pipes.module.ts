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
const pipes = [
  ExcerptPipe,
  GetValueByKeyPipe,
  RelativeTimePipe,
  FilterByPipe,
  SafeHtmlPipe,
  FileTypePipe,
  MySlicePipe,
  LocalizationPipe
];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: pipes,
  exports: pipes
})
export class SharedPipesModule { }
