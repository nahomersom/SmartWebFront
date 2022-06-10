import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ProcurementService } from './procurement.service';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LanguageModule } from 'src/app/language/language/language.module';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { HtmlSanitaizerModule } from 'src/app/index/htmlSanitaizer/html-sanitaizer.module';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


const routes: Routes = [
  {
    path: '',
    component: ListComponent,
  },
  {
    path: 'edit/:id',
    component: FormComponent,
  },
  {
    path: ':reqId/plan',
    component: FormComponent,
  },
  {
    path: 'create',
    component: FormComponent,
  }
];

@NgModule({
  declarations: [ListComponent, FormComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    LanguageModule,
    CommonModule,
    ButtonModule,
    RouterModule.forChild(routes),
    HtmlSanitaizerModule,
    CKEditorModule,
    NgbModule
  ],
  providers: [
    ProcurementService
  ]
})
export class ProcurementModule { }