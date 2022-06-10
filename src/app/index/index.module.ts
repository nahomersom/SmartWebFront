import { UploaderModule } from '@syncfusion/ej2-angular-inputs';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IndexService } from './Services/index.service';
import { ViewScheduleComponent } from '../studentManagement/view-schedule/view-schedule.component';
import { ViewResultComponent } from '../studentManagement/view-result/view-result.component';
import { StudentProfileComponent } from '../studentManagement/student-profile/student-profile.component';
import { StudentApplicationComponent } from '../studentManagement/student-application/student-application.component';
import { EditPasswordComponent } from '../studentManagement/edit-profile/edit-password.component';
import { StudentService } from '../studentManagement/services/student.service';
import { DataViewComponent } from '../studentManagement/shared/data-view/data-view.component';
import { AuthGarde } from '../AuthGarde';
import { NgbModule, NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { VerificationComponent } from '../verification/verification.component';
import { ModalComponent } from '../studentManagement/shared/modal/modal.component';
import { SubscriptionComponent } from '../subscription/subscription.component';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { HtmlSanitaizerModule } from './htmlSanitaizer/html-sanitaizer.module';
import { LanguageModule } from '../language/language/language.module';
import { TokenizeService } from '../tokenize.service';
import { BackendService } from '../userManagement/backend-service';
import { CommonModule } from '@angular/common';
import { AssessmentPlanComponent } from '../studentManagement/assessment-plan/create/assessment-plan.component';
import { AssessmentPlanViewComponent } from '../studentManagement/assessment-plan/view/assessment-plan-view.component';
import { SubscriptionModule } from '../subscription/subscription.module';
const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
  },
  {
    path: 'schedule',
    component: ViewScheduleComponent,
    canActivate: [AuthGarde]
  },
  {
    path: 'result',
    component: ViewResultComponent,
    canActivate: [AuthGarde]
  },
  {
    path: 'studentProfile',
    component: StudentProfileComponent,
    canActivate: [AuthGarde]
  },
  {
    path: 'studentProfile/:id',
    component: StudentProfileComponent,
    canActivate: [AuthGarde]
  },
  {
    path: 'assessment-plan/create',
    component: AssessmentPlanComponent,
    canActivate: [AuthGarde]
  },
  {
    path: 'assessment-plan/edit/:id',
    component: AssessmentPlanComponent,
    canActivate: [AuthGarde]
  },
  {
    path: 'assessment-plan/view',
    component: AssessmentPlanViewComponent,
    canActivate: [AuthGarde]
  },
  {
    path: 'apply',
    component: StudentApplicationComponent,
    canActivate: [AuthGarde]
  },
  {
    path: 'editProfile',
    component: EditPasswordComponent,
    canActivate: [AuthGarde]
  }
];

@NgModule({
  declarations: [IndexComponent, ViewScheduleComponent, ViewResultComponent, StudentProfileComponent, AssessmentPlanComponent,
    AssessmentPlanViewComponent,
    StudentApplicationComponent, EditPasswordComponent, DataViewComponent, VerificationComponent, ModalComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    AngularMultiSelectModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    HtmlSanitaizerModule,
    RouterModule.forChild(routes),
    LanguageModule,
    UploaderModule,
    SubscriptionModule
  ],
  providers: [
    IndexService,
    StudentService,
    BackendService,
    NgbCarouselConfig,
    { provide: HTTP_INTERCEPTORS, useClass: TokenizeService, multi: true },
  ],
  exports: [RouterModule, SubscriptionComponent],
  entryComponents: [ModalComponent]

})

export class IndexModule { }
