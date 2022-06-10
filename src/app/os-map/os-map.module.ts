import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OsMapComponent } from './os-map.component';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LanguageModule } from '../language/language/language.module';

const routes: Routes = [
  {
    path: '',
    component: OsMapComponent,
  },

];
@NgModule({
  declarations: [OsMapComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    LanguageModule,
    RouterModule.forChild(routes)
  ],
  providers: [],
  exports: [RouterModule]
})
export class OsMapModule { }
