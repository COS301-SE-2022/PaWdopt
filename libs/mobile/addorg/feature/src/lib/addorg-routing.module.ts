import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddorgPageComponent } from './addorg.page';

const routes: Routes = [
  {
    path: '',
    component: AddorgPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddorgPageComponentRoutingModule {}
