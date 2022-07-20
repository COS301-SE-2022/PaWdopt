import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { orgprofilePageComponent } from './orgprofile.page';

const routes: Routes = [
  {
    path: '',
    component: orgprofilePageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class orgprofilePageComponentRoutingModule {}
