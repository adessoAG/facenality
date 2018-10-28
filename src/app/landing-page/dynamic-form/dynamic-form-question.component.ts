import { Component, Input, Output, EventEmitter } from '@angular/core';
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
  @Output() formResults = new EventEmitter<any>();

  page = 1;
  itemsPerPage = 5;
  maxPages;
  pagedItems: any[];

  showResultButton = false;

  ngOnInit() {
    this.maxPages = Math.round(this.questions.length / this.itemsPerPage) + 1;
    // Initialize first page of questionnaire
    this.nextPage();
  }

  nextPage() {
    const start = (this.page - 1) * this.itemsPerPage;
    const end = this.page * this.itemsPerPage;
    this.pagedItems = this.questions.slice(start, end);

    window.scroll({
      top: 2200,
      behavior: "smooth"
    });

    this.page++;
    if (this.page > this.maxPages) { this.showResultButton = true; }
  }

  /**
   * Display 100% progress and emit results to parent component 
   */
  submitResults() {
    this.page++;
    this.formResults.emit();
  }

  get isValid() { return this.form.valid; }
}