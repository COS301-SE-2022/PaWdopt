import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { uikitPageComponent } from './uikit.page';

const routes: Routes = [
  {
    path: '',
    component: uikitPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class uikitPageComponentRoutingModule {}
