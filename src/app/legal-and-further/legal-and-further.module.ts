import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { routing } from './legal-and-further.routing';
import { LegalAndPrivacyComponent } from './legal-and-privacy/legal-and-privacy.component';
import { AboutComponent } from './about/about.component';
import { CentralRenderComponent } from './central-render.component';
import { FaqComponent } from './faq/faq.component';

@NgModule({
  declarations: [CentralRenderComponent, LegalAndPrivacyComponent, AboutComponent, FaqComponent],
  imports: [routing, SharedModule],
  entryComponents: [LegalAndPrivacyComponent, AboutComponent, FaqComponent]
})
export class LegalAndFurtherModule { }
