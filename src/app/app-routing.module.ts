import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGarde } from './AuthGarde';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EventComponent } from './event/event.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/index',
    pathMatch: 'full'
  },
  {
    path: 'index',
    loadChildren: () => import('./index/index.module').then(m => m.IndexModule),
  },
  {
    path: 'event/:id',
    component: EventComponent
  },
  {
    path: 'osmap',
    loadChildren: () => import('./os-map/os-map.module').then(m => m.OsMapModule),
  },
  {
    path: 'bid',
    loadChildren: () => import('./bidz/bidz.module').then(m => m.BidzModule),
  },
  {
    path: 'medias',
    loadChildren: () => import('./medias/medias.module').then(m => m.MediasModule),
  },
  {
    path: 'contact',
    loadChildren: () => import('./contact-us/contact.module').then(m => m.ContactModule),
  },
  {
    path: 'application',
    loadChildren: () => import('./candidate-profile/candidate-profile.module').then(m => m.CandidateProfileModule),
    // canLoad: [AuthGarde]
  },
  {
    path: 'pages/:id',
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./userManagement/login/login.module').then(m => m.LoginModule),
    canLoad: [AuthGarde]
  },
  {
    path: 'signup',
    loadChildren: () => import('./userManagement/signup/signup.module').then(m => m.SignupModule),
    canLoad: [AuthGarde]
  },
  {
    path: 'passwordreset',
    loadChildren: () => import('./userManagement/passwordreset/passwordreset.module').then(m => m.PasswordresetModule),
    canLoad: [AuthGarde]
  },
  {
    path: 'verification',
    loadChildren: () => import('./userManagement/verification/verification.module').then(m => m.VerificationModule),
    canLoad: [AuthGarde]
  },
  {
    path: 'passwordChange',
    loadChildren: () => import('./userManagement/change-password/change-password.module').then(m => m.ChangePasswordModule),
    canLoad: [AuthGarde]
  },
  {
    path: 'members/create',
    loadChildren: () => import('./membersDirectory/create/create.module').then(m => m.CreateModule),
    canLoad: [AuthGarde]
  },
  {
    path: 'members/edit/:id',
    loadChildren: () => import('./membersDirectory/create/create.module').then(m => m.CreateModule),
  },
  {
    path: 'members/view',
    loadChildren: () => import('./membersDirectory/view/view.module').then(m => m.ViewModule),
  },
  {
    path: 'ourteam',
    loadChildren: () => import('./our-team/our-team.module').then(m => m.OurTeamModule),
  },
  {
    path: 'documentation',
    loadChildren: () => import('./documentation/documentation.module').then(m => m.DocumentationModule),
  },
  {
    path: 'request',
    loadChildren: () => import('../app/request/request.module').then(m => m.RequestModule),
  },
  {
    path: 'feedback',
    loadChildren: () => import('../app/feedback/feedback.module').then(m => m.FeedbackModule),
  },
  {
    path: 'complain',
    loadChildren: () => import('../app/complain/complain.module').then(m => m.ComplainModule),
  },
  {
    // 404
    path: '**',
    component: NotFoundComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    BrowserAnimationsModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
