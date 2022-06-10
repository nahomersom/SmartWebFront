import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LanguageModule } from '../language/language/language.module';
import { HtmlSanitaizerModule } from '../index/htmlSanitaizer/html-sanitaizer.module';
import { DetailComponent } from './detail/detail.component';

const routes: Routes = [
  {
    path: 'Procurement-bid-invitation-notice',
    component: ListComponent,
  },
  {
    path: 'Procurement-award-information',
    component: DetailComponent,
  },
  {
    path: 'Disposal-bid-invitation-notice',
    component: ListComponent,
  },
  {
    path: 'Disposal-award-information',
    component: DetailComponent,
  },
  {
    path: 'Disposal-bid-disclosure',
    component: ListComponent,
  },
  {
    path: 'Procurement-bid-disclosure',
    component: ListComponent,
  },
  {
    path: 'detail',
    component: DetailComponent,
  },
];

@NgModule({
  declarations: [ListComponent, DetailComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    LanguageModule,
    RouterModule.forChild(routes),
    HtmlSanitaizerModule
  ],
  providers: [],
  exports: [RouterModule]
})
export class BidzModule { }
