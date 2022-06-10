import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComplainFormComponent } from './complain-form/complain-form.component';
import { ComplainListComponent } from './complain-list/complain-list.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LanguageModule } from '../language/language/language.module';
import { DisposalService } from '../request/disposal/disposal.service';
import { ComplainService } from './complain.service';

const routes: Routes = [
  {
    path: 'disposal-complain',
    component: ComplainListComponent,
  },
  {
    path: 'procurement-complain',
    component: ComplainListComponent,
  },
  {
    path: 'disposal-complain-form',
    component: ComplainFormComponent,
  },
  {
    path: 'procurement-complain-form',
    component: ComplainFormComponent,
  },
];

@NgModule({
  declarations: [ComplainFormComponent, ComplainListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    LanguageModule
  ],
  providers: [
    ComplainService,
  ]
})
export class ComplainModule { }
