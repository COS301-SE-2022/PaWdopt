import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrgSettingsPageComponent } from './orgsettings.page';

const routes: Routes = [
  {
    path: '',
    component: OrgSettingsPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrgSettingsPageComponentRoutingModule {}
