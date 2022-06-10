import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OurTeamComponent } from './our-team.component';
import { Routes, RouterModule } from '@angular/router';
import { LanguageModule } from '../language/language/language.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IndexService } from '../index/Services/index.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './modal/modal.component';

const routes: Routes = [
  {
    path: '',
    component: OurTeamComponent,
  },
];
@NgModule({
  declarations: [OurTeamComponent, ModalComponent],
  imports: [
    CommonModule,
    LanguageModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [IndexService],
  exports: [RouterModule],
  entryComponents: [ModalComponent]
})
export class OurTeamModule { }
