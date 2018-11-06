import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LandingPageComponent } from './landing-page/landing-page.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'result', loadChildren: './prediction-result/prediction-result.module#PredictionResultModule' },
  { path: 'legal-and-privacy', loadChildren: './legal-and-further/legal-and-further.module#LegalAndFurtherModule' },
  { path: 'about', loadChildren: './legal-and-further/legal-and-further.module#LegalAndFurtherModule' },
  { path: 'faq', loadChildren: './legal-and-further/legal-and-further.module#LegalAndFurtherModule' },
  { path: '404', loadChildren: './error/error.module#ErrorModule' },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
