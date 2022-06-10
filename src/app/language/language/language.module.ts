import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
  ],
  exports: [
    TranslateModule,
  ]

})
export class LanguageModule { }
