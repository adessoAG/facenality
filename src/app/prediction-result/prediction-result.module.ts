import { NgModule } from '@angular/core';

import { routing } from './prediction-result.routing';
import { ResultPageComponent } from './result-page/result-page.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    routing,
    SharedModule
  ],
  declarations: [ResultPageComponent]
})
export class PredictionResultModule { }
