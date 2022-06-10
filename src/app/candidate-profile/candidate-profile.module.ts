import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CandidateProfileComponent } from './candidate-profile.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { LanguageModule } from '../language/language/language.module';
import { UploaderModule  } from '@syncfusion/ej2-angular-inputs';
import { StudentService } from '../studentManagement/services/student.service';
import { TokenizeService } from '../tokenize.service';

const routes: Routes = [
  {
    path: '',
    component: CandidateProfileComponent,
  },
];

@NgModule({
  declarations: [CandidateProfileComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    AngularMultiSelectModule,
    LanguageModule,
    UploaderModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    StudentService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenizeService, multi: true }
  ],
  exports: [RouterModule]
})
export class CandidateProfileModule { }
