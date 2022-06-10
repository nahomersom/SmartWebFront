import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IndexService } from '../index/Services/index.service';
import { CommentsComponent } from '../studentManagement/shared/comments/comments.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HtmlSanitaizerModule } from '../index/htmlSanitaizer/html-sanitaizer.module';
import { LanguageModule } from '../language/language/language.module';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
  }
];
@NgModule({
  declarations: [PagesComponent, CommentsComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    LanguageModule,
    HtmlSanitaizerModule,
    RouterModule.forChild(routes)
],
providers: [IndexService],
exports: [RouterModule]
})
export class PagesModule { }
