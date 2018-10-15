import { NgModule } from '@angular/core';
import { LandingPageComponent } from './landing-page.component';
import { SharedModule } from '../shared/shared.module';
import { GeneralInfoFormComponent } from './general-info-form/general-info-form.component';
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [LandingPageComponent, GeneralInfoFormComponent, QuestionnaireComponent]
})
export class LandingPageModule { }
