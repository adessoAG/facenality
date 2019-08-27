import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { LandingPageComponent } from './landing-page.component';
import { GeneralInfoFormComponent } from './general-info-form/general-info-form.component';
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';
import { DynamicFormQuestionComponent } from './dynamic-form/dynamic-form-question.component';
import { PredictionResultModule } from '../prediction-result/prediction-result.module';

@NgModule({
  imports: [
    SharedModule,
    PredictionResultModule
  ],
  declarations: [LandingPageComponent, GeneralInfoFormComponent, QuestionnaireComponent, DynamicFormQuestionComponent]
})
export class LandingPageModule { }
