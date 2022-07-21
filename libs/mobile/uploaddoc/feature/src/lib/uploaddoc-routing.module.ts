import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { uploaddocPageComponent } from './uploaddoc.page';

const routes: Routes = [
  {
    path: '',
    component: uploaddocPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class uploaddocPageComponentRoutingModule {}
