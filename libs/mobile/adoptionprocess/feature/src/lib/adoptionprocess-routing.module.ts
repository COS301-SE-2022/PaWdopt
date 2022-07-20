import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { adoptionprocessPageComponent } from './adoptionprocess.page';

const routes: Routes = [
  {
    path: '',
    component: adoptionprocessPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class adoptionprocessPageComponentRoutingModule {}
