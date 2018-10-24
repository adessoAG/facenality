import { NgModule } from '@angular/core';

import { NotFoundComponent } from './not-found/not-found.component';
import { routing } from './error.routing';

@NgModule({
  declarations: [NotFoundComponent],
  imports: [routing]
})
export class ErrorModule { }
