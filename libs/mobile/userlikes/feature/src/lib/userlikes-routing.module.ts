import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { userlikesPageComponent } from './userlikes.page';

const routes: Routes = [
  {
    path: '',
    component: userlikesPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class userlikesPageComponentRoutingModule {}
