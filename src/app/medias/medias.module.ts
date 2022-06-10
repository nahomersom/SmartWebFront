import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaService } from './Services/media.service';
import { Routes, RouterModule } from '@angular/router';
import { MediasComponent } from './medias.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LanguageModule } from '../language/language/language.module';

const routes: Routes = [
  {
    path: ':id/:mediaType',
    component: MediasComponent,
  },

];
@NgModule({
  declarations: [MediasComponent],
  imports: [
  CommonModule,
  HttpClientModule,
  FormsModule,
  ReactiveFormsModule,
  NgbModule,
  LanguageModule,
  RouterModule.forChild(routes)
],
providers: [MediaService],
exports: [RouterModule]
})
export class MediasModule { }
