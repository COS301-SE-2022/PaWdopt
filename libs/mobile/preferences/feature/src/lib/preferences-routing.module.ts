import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreferencesPageComponent } from './preferences.page';

const routes: Routes = [
  {
    path: '',
    component: PreferencesPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PreferencesPageComponentRoutingModule {}
