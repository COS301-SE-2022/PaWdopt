import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { updateorremovedogPageComponent } from './updateorremovedog.page';

const routes: Routes = [
  {
    path: '',
    component: updateorremovedogPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class updateorremovedogPageComponentRoutingModule {}
