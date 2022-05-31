import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'signup',
    loadChildren: () =>
      import('@pawdopt/mobile/signup/feature').then(
        (m) => m.SignupPageComponentModule
      ),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('@pawdopt/mobile/login/feature').then(
        (m) => m.LoginPageComponentModule
      )
  },
  {
    path: 'addorg',
    loadChildren: () =>
      import('@pawdopt/mobile/addorg/feature').then(
        (m) => m.AddorgPageComponentModule
      )
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('@pawdopt/mobile/dashboard/feature').then(
        (m) => m.dashboardPageComponentModule
      )
  },
  {
    path: 'adddog',
    loadChildren: () =>
      import('@pawdopt/mobile/adddog/feature').then(
        (m) => m.AdddogPageComponentModule
      )
  },
  {
    path: 'uikit',
    loadChildren: () =>
      import('@pawdopt/mobile/uikit/feature').then(
        (m) => m.uikitPageComponentModule
      )
  },
  {
    path: 'userlikes',
    loadChildren: () =>
      import('@pawdopt/mobile/userlikes/feature').then(
        (m) => m.userlikesPageComponentModule
      )
  },
  {
    path: 'ownneddogs',
    loadChildren: () =>
      import('@pawdopt/mobile/owneddogs/feature').then(
        (m) => m.owneddogsPageComponentModule
      )
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
