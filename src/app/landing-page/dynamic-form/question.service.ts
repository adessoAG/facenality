import { Injectable } from '@angular/core';

import { QuestionBase } from './types/question-base';
import { DropdownQuestion } from './types/question-dropdown';
import { RadioQuestion } from './types/question-radio';
import { TextboxQuestion } from './types/question-textbox';

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

  /**
   * Generates the questions to be used in the questionnaire
   */
  getQuestions() {
    for (const i of this.generateQuestionKeys()) {
      this.questionnair.push(
        new RadioQuestion({
          key: i,
          options: this.radioAnswerOptions,
          value: '0',
        })
      )
    }

    return this.shuffle(this.questionnair);
  }

  /**
   * Generates 10 question keys per letter with exception to Q4. 
   * E.g. : A1 - A10, B1 - B10, ... , Q4-1 - Q4-10
   */
  generateQuestionKeys() {
    const questionKeyLetters = ["A", "B", "C", "E", "F", "G", "H", "I", "L", "M", "N", "O", "Q1_", "Q2_", "Q3_", "Q4_"];
    let finalQuestionKeys: string[] = [];

    for (let letter of questionKeyLetters) {
      for (let i = 1; i < 11; i++) {
        finalQuestionKeys.push(letter + i);
      }
    }
        
    return finalQuestionKeys;
  }

  /**
   * Shuffles array in place.
   * @param {Array} a items An array containing the items.
   */
  shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
    }
    return a;
  }
}