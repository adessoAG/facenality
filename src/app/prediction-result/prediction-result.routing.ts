import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { ResultPageComponent } from './result-page/result-page.component';

const routes: Routes = [
  { path: '', component: ResultPageComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
