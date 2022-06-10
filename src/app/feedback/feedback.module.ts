import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbackComponent } from './feedback/feedback.component';
import { RouterModule, Routes } from '@angular/router';
import { LanguageModule } from '../language/language/language.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FeedbackService } from './feedback.service';

const routes: Routes = [
  {
    path: '',
    component: FeedbackComponent,
  },
];


@NgModule({
  declarations: [FeedbackComponent],
  imports: [
    CommonModule,
    LanguageModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule.forChild(routes)
  ],
  providers: [FeedbackService],
  exports: [RouterModule]
})
export class FeedbackModule { }
