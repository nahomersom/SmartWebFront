import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'procurement',
    loadChildren: () => import('../request/procurement/procurement.module').then(m => m.ProcurementModule),
  },
  {
    path: 'disposal',
    loadChildren: () => import('../request/disposal/disposal.module').then(m => m.DisposalModule),
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})

export class RequestModule { }