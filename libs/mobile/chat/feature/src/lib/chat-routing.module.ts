import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { chatPageComponent } from './chat.page';

const routes: Routes = [
  {
    path: '',
    component: chatPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class chatPageComponentRoutingModule {}
