import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../modal/modal.component';
import { Routes, RouterModule } from '@angular/router';
import { ViewComponent } from './view.component';
import { LanguageModule } from 'src/app/language/language/language.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MembersService } from '../members.service';

const routes: Routes = [
  {
    path: '',
    component: ViewComponent,
  },
];
@NgModule({
  declarations: [ViewComponent, ModalComponent],
  imports: [
    CommonModule,
    LanguageModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [MembersService],
  exports: [RouterModule],
  entryComponents: [ModalComponent]
})
export class ViewModule { }
