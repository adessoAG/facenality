import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { CentralRenderComponent } from './central-render.component';

const routes: Routes = [
  { path: '', component: CentralRenderComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
