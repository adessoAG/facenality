import { NgModule } from '@angular/core';

import { NotFoundComponent } from './not-found/not-found.component';
import { routing } from './error.routing';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [NotFoundComponent],
  imports: [SharedModule, routing]
})
export class ErrorModule { }
