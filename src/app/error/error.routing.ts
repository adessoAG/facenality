import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: '', component: NotFoundComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
