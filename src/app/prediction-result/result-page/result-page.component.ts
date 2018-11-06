import { Component, OnInit } from '@angular/core';
import { DataExchangeService } from 'src/app/shared/data-exchange.service';
import { Questionnaire } from 'src/app/landing-page/dynamic-form/types/questionnaire';

@Component({
  selector: 'app-result-page',
  templateUrl: './result-page.component.html',
  styleUrls: ['./result-page.component.css']
})
export class ResultPageComponent implements OnInit {

  questionnaire: Questionnaire;

  constructor(private dataExchangeService: DataExchangeService) { }

  /** TODO: Get and display predicted results for @cattells16QuestionsForm */ 
  ngOnInit() {
    this.dataExchangeService.getData().subscribe((questionnaire) => this.questionnaire = questionnaire);
    this.questionnaire.id = 1337; // DEV MODE
  }

}
