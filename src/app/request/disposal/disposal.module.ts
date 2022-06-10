import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DisposalService } from './disposal.service';
import { FormComponent } from './form/form.component';
import { ListComponent } from './list/list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LanguageModule } from 'src/app/language/language/language.module';
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
    CommonModule,
    LanguageModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    CKEditorModule,
    NgbModule
  ],
  providers: [
    DisposalService
  ]
})
export class DisposalModule { }
