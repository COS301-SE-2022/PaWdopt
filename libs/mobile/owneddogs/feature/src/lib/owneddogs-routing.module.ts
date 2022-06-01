import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { owneddogsPageComponent } from './owneddogs.page';

const routes: Routes = [
  {
    path: '',
    component: owneddogsPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class owneddogsPageComponentRoutingModule {}
