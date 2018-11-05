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
  itemsPerPage = 11;
  maxPages;
  pagedItems: any[];

  showResultButton = false;

  ngOnInit() {
    this.maxPages = Math.round(this.questions.length / this.itemsPerPage) + 1;
    // Initialize first page of questionnaire
    this.loadNextPage();
  }

  loadNextPage(scrollTarget?) {
    const start = (this.page - 1) * this.itemsPerPage;
    const end = this.page * this.itemsPerPage;
    this.pagedItems = this.questions.slice(start, end);

    if (scrollTarget !== undefined) {
      scrollTarget.scrollIntoView({
        behavior: "smooth"
      });
    }

    this.page++;
    if (this.page > this.maxPages) { this.showResultButton = true; }
  }

  loadLastPage(scrollTarget) {
    this.pagedItems = this.questions.slice(this.maxPages-1, this.maxPages);

    if (scrollTarget !== undefined) {
      scrollTarget.scrollIntoView({
        behavior: "smooth"
      });
    }

    this.page = this.maxPages + 1;
    this.submitResults();
  }

  /**
   * Display 100% progress and emit results to parent component 
   */
  submitResults() {
    this.page++;
    this.formResults.emit(this.form);
  }

  get isValid() { return this.form.valid; }
}