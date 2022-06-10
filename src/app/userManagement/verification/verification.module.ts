import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BackendService } from '../backend-service';
import { RouterModule, Routes } from '@angular/router';
import { VerificationComponent } from './verification.component';
import { LanguageModule } from 'src/app/language/language/language.module';



const routes: Routes = [
  {
    path: '',
    component: VerificationComponent
  }
];

@NgModule({
  declarations: [VerificationComponent],
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
export class VerificationModule { }
