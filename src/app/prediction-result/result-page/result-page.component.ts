import { Component, OnInit } from '@angular/core';
import { DataExchangeService } from 'src/app/shared/data-exchange.service';
import { Questionnaire, PHOTO_DESCRIPTIONS } from 'src/app/landing-page/dynamic-form/types/questionnaire';

@Component({
  selector: 'app-result-page',
  templateUrl: './result-page.component.html',
  styleUrls: ['./result-page.component.css']
})
export class ResultPageComponent implements OnInit {

  questionnaire: Questionnaire;
  photoDescriptions = PHOTO_DESCRIPTIONS;
  descriptionLabel = this.photoDescriptions[0].label;

  constructor(private dataExchangeService: DataExchangeService) { }

  /** TODO: Get and display predicted results for @cattells16QuestionsForm */
  ngOnInit() {
    this.dataExchangeService.getData().subscribe((questionnaire) => {
      setTimeout(() => this.questionnaire = questionnaire, 1500); // Just for the "feeling". Evaluate if necessary
    });
    this.questionnaire.id = 1337; // DEV MODE 
  }
  
  swapMainPhoto(i: number) {
    let h = this.photoDescriptions[0];
    this.photoDescriptions[0] = this.photoDescriptions[i];
    this.photoDescriptions[i] = h;
    this.descriptionLabel = this.photoDescriptions[0].label;

    let h2 = this.questionnaire.photos[0];
    this.questionnaire.photos[0] = this.questionnaire.photos[i];
    this.questionnaire.photos[i] = h2;
  }

}
