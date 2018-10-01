import { Routes, RouterModule } from '@angular/router';
import { ResultPageComponent } from './result-page/result-page.component';
import { ModuleWithProviders } from '@angular/core';

const routes: Routes = [
  { path: '', component: ResultPageComponent }
];
 
export const routing: ModuleWithProviders = RouterModule.forChild(routes);
