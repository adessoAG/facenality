import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { QuestionBase } from './types/question-base';

@Component({
  selector: 'landing-page-dynamic-form',
  templateUrl: './dynamic-form-question.component.html',
  styleUrls: ['./dynamic-form-question.component.css']
})

export class DynamicFormQuestionComponent {
  @Input() questions: QuestionBase<any>[];
  @Input() form: FormGroup;
  
  get isValid() { return this.form.valid; }
}