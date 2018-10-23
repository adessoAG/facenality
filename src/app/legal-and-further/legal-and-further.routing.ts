import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { LegalAndPrivacyComponent } from './legal-and-privacy/legal-and-privacy.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  { path: '', component: LegalAndPrivacyComponent },
  { path: 'legal-and-privacy', component: LegalAndPrivacyComponent },
  { path: 'about', component: AboutComponent }

];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
