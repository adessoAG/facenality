import { NgModule } from '@angular/core';

import { routing } from './prediction-result.routing';
import { ResultPageComponent } from './result-page/result-page.component';
import { SharedModule } from '../shared/shared.module';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  imports: [
    routing,
    SharedModule,
    ChartsModule
  ],
  declarations: [ResultPageComponent]
})
export class PredictionResultModule { }
