import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ContactUsComponent } from './contact-us.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LanguageModule } from '../language/language/language.module';
import { ContactUsService } from './contact-us.service';
import { AgmCoreModule } from '@agm/core';



const routes: Routes = [
  {
    path: '',
    component: ContactUsComponent,
  },
];

@NgModule({
  declarations: [ContactUsComponent],
  imports: [
    CommonModule,
    LanguageModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB5vdGUoozI7wAQvuEb4bwoTp4EStiemEs'
    }),
    RouterModule.forChild(routes)
  ],
  providers: [ContactUsService],
  exports: [RouterModule]
})
export class ContactModule { }
