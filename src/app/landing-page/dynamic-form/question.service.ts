import { Injectable } from '@angular/core';

import { QuestionBase } from './types/question-base';
import { DropdownQuestion } from './types/question-dropdown';
import { RadioQuestion } from './types/question-radio';
import { TextboxQuestion } from './types/question-textbox';

// import * as questions_json from './questions-cattells-16.json';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  radioOptions = [
    { key: '1', value: 'strongly disagree' },
    { key: '2', value: 'disagree' },
    { key: '3', value: 'neither' },
    { key: '4', value: 'agree' },
    { key: '5', value: 'strongly agree' }
  ]

  questionnairCattells16: RadioQuestion[] = [];

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
    //this.questionnairCattells16 = questions_json;

    let questions: QuestionBase<any>[] = [
      new RadioQuestion({
        controlType: 'radio',
        value: '0',
        key: 'A1',
        required: true,
        order: 1,
        label: 'I know how to comfort others',
        options: this.radioOptions
      }),
      new RadioQuestion({
        controlType: 'radio',
        value: '0',
        key: 'A2',
        required: true,
        order: 1,
        label: 'I am a warm person',
        options: this.radioOptions
      })
    ];


    return questions.sort((a, b) => a.order - b.order);
  }


}