import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { userprofilePageComponent } from './userprofile.page';

const routes: Routes = [
  {
    path: '',
    component: userprofilePageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class userprofilePageComponentRoutingModule {}
