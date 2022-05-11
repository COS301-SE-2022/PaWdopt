import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdddogPageComponent } from './adddog.page';

const routes: Routes = [
  {
    path: '',
    component: AdddogPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdddogPageComponentRoutingModule {}
