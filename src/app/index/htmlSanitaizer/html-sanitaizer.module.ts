import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HtmlSanitaizerPipe } from './html-sanitaizer.pipe';


@NgModule({
  declarations: [HtmlSanitaizerPipe],
  imports: [
    CommonModule
  ],
  exports: [HtmlSanitaizerPipe],
})
export class HtmlSanitaizerModule { }
