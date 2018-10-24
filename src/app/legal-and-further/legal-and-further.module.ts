import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { routing } from './legal-and-further.routing';
import { LegalAndPrivacyComponent } from './legal-and-privacy/legal-and-privacy.component';
import { AboutComponent } from './about/about.component';
import { CentralRenderComponent } from './central-render.component';

@NgModule({
  declarations: [CentralRenderComponent, LegalAndPrivacyComponent, AboutComponent],
  imports: [routing, SharedModule],
  entryComponents: [LegalAndPrivacyComponent, AboutComponent]
})
export class LegalAndFurtherModule { }
