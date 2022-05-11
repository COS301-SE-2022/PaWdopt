import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { dashboardPageComponent } from './dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: dashboardPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class dashboardPageComponentRoutingModule {}
