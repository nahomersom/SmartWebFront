import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentationComponent } from './documentation.component';
import { DocumentationService } from './documentation.service';
import { Routes, RouterModule } from '@angular/router';
import { LanguageModule } from '../language/language/language.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  {
    path: ':id',
    component: DocumentationComponent,
  },
];
@NgModule({
  declarations: [DocumentationComponent],
  imports: [
    CommonModule,
    LanguageModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [DocumentationService],
  exports: [RouterModule],
})
export class DocumentationModule { }
