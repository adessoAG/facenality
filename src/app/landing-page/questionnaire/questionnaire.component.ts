import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'landing-page-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css']
})
export class QuestionnaireComponent implements OnInit {

  progressBarValue: number = 10;

  constructor() { }

  ngOnInit() {
  }

}
