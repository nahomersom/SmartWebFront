import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create.component';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LanguageModule } from '../../language/language/language.module';
import { UploaderModule } from '@syncfusion/ej2-angular-inputs';
import { TokenizeService } from 'src/app/tokenize.service';
import { MembersService } from '../members.service';



const routes: Routes = [
  {
    path: '',
    component: CreateComponent,
  },
];
@NgModule({
  declarations: [CreateComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    LanguageModule,
    UploaderModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    MembersService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenizeService, multi: true }
  ],
  exports: [RouterModule]
})
export class CreateModule { }
