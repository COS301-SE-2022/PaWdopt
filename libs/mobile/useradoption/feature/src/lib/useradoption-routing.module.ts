import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { useradoptionPageComponent } from './useradoption.page';

const routes: Routes = [
  {
    path: '',
    component: useradoptionPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class useradoptionPageComponentRoutingModule {}
