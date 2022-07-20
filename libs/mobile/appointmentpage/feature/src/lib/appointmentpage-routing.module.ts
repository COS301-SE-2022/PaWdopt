import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { appointmentpagePageComponent } from './appointmentpage.page';

const routes: Routes = [
  {
    path: '',
    component: appointmentpagePageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class appointmentpagePageComponentRoutingModule {}
