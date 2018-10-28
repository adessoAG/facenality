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

  questionnair: QuestionBase<any>[] = [];

  radioAnswerOptions = [
    { key: '1', value: 'strongly disagree' },
    { key: '2', value: 'disagree' },
    { key: '3', value: 'neither' },
    { key: '4', value: 'agree' },
    { key: '5', value: 'strongly agree' }
  ]

  questionnairCattells16 = [
    {
      "key": "A1",
      "label": "I know how to comfort others"
    },
    {
      "key": "A2",
      "label": "I enjoy bringing people together"
    },
    {
      "key": "A3",
      "label": "I feel others' emotions"
    },
    {
      "key": "A4",
      "label": "I take an interest in other people's lives"
    },
    {
      "key": "A5",
      "label": "I know how to comfort others"
    },
    {
      "key": "A6",
      "label": "I enjoy bringing people together"
    },
    {
      "key": "A7",
      "label": "I feel others' emotions"
    },
    {
      "key": "A8",
      "label": "I take an interest in other people's lives"
    },
    {
      "key": "A9",
      "label": "I know how to comfort others"
    },
    {
      "key": "A10",
      "label": "I enjoy bringing people together"
    },
    {
      "key": "A3",
      "label": "I feel others' emotions"
    },
    {
      "key": "A4",
      "label": "I take an interest in other people's lives"
    },
    {
      "key": "A5",
      "label": "I know how to comfort others"
    },
    {
      "key": "A6",
      "label": "I enjoy bringing people together"
    },
    {
      "key": "A7",
      "label": "I feel others' emotions"
    },
    {
      "key": "A8",
      "label": "I take an interest in other people's lives"
    }
  ];

  getQuestions() {
    for (const i of this.questionnairCattells16) {
      this.questionnair.push(
        new RadioQuestion({
          key: i.key,
          label: i.label,
          options: this.radioAnswerOptions,
          value: '0',
          order: 1,
          required: true,
          controlType: 'radio',
        })
      )
    }
    return this.questionnair.sort((a, b) => a.order - b.order);
  }

}