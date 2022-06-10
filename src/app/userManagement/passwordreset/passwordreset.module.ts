import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordresetComponent } from './passwordreset.component';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BackendService } from '../backend-service';
import { LanguageModule } from 'src/app/language/language/language.module';

const routes: Routes = [
  {
    path: '',
    component: PasswordresetComponent
  }
];

@NgModule({
  declarations: [PasswordresetComponent],
  imports: [
    CommonModule,
    LanguageModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [BackendService],
  exports: [RouterModule]
})
export class PasswordresetModule { }
