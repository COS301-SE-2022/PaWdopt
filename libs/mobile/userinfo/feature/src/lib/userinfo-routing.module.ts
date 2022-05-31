import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { userinfoPageComponent } from './userinfo.page';

const routes: Routes = [
  {
    path: '',
    component: userinfoPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class userinfoPageComponentRoutingModule {}
