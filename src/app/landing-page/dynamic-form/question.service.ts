import { Injectable } from '@angular/core';

import { QuestionBase } from './types/question-base';
import { DropdownQuestion } from './types/question-dropdown';
import { RadioQuestion } from './types/question-radio';
import { TextboxQuestion } from './types/question-textbox';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  radioOptions = [
    { key: '1', value: 'Solidxx' },
    { key: '2', value: 'Great' },
    { key: '3', value: 'Good' },
    { key: '4', value: 'Unproven' },
    { key: '5', value: 'Very Good' }
  ]

  radioQuestions: RadioQuestion[] = [
    new RadioQuestion({
      controlType: 'radio',
      value: '',
      key: 'A1',
      required: true,
      order: 1,
      label: 'I know how to comfort others',
      options: this.radioOptions
    })
  ];

  getQuestions() {

    let questions: QuestionBase<any>[] = [
      new RadioQuestion({
        controlType: 'radio',
        value: '',
        key: 'A1',
        required: true,
        order: 1,
        label: 'I know how to comfort others',
        options: this.radioOptions
      }),
      new RadioQuestion({
        controlType: 'radio',
        value: '',
        key: 'A2',
        required: true,
        order: 1,
        label: 'I know how to comfort others',
        options: this.radioOptions
      })
    ];


    return questions.sort((a, b) => a.order - b.order);
  }


}