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
    redirectTo: 'home',
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
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
