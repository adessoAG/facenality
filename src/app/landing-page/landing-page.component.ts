import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { QuestionControlService } from './dynamic-form/question-control.service';
import { QuestionService } from './dynamic-form/question.service';
import { HttpService } from '../shared/http.service';
import { QuestionBase } from './dynamic-form/types/question-base';
import { Questionnaire } from './dynamic-form/types/questionnaire';
import { ImageComponent } from '../shared/image/image.component';
import { DataExchangeService } from '../shared/data-exchange.service';

@Component({
  selector: 'landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  /**
   * @property webcamUserPermission : Underlying modell for webcam permission
   * @property showPermissionWarning : Displays warning alert if user didn't set @webcamUserPermission to true 
   * @property showPermissionAlert : Displays critical alert if webcam permission is blocked by device
   */
  webcamUserPermission = 0;
  showPermissionWarning = false;
  showPermissionAlert = false;

  /**
   * @property cattells16Questions : Array containing questions for Cattells' 16 personality test
   * @property cattells16QuestionsForm : Form containing @cattells16Questions   
   * @property completeQuestionnaire : Questionnaire object to be send and stored in backend  
   */
  cattells16Questions: QuestionBase<any>[] = [];
  cattells16Form: FormGroup;
  generalInfoForm: FormGroup;
  isCattells16FormComplete: boolean;
  questionnaireFinal: Questionnaire = null;

  userStartTime: number;

  @ViewChildren(ImageComponent) images: QueryList<ImageComponent>

  constructor(private qcs: QuestionControlService, private qs: QuestionService, private httpService: HttpService,
    private router: Router, private dataExchangeService: DataExchangeService) { }

  ngOnInit() {
    this.cattells16Questions = this.qs.getQuestions();
    this.cattells16Form = this.qcs.toFormGroup(this.cattells16Questions);

    this.userStartTime = new Date().getSeconds();
  }

  onCattells16FormComplete() {
    this.isCattells16FormComplete = true;
  }

  /**
   * Constructs a new @completeQuestionnaire object and uses @httpService to send it to the backend.
   */
  submitQuestionnaire(generalInfoForm: FormGroup) {
    this.generalInfoForm = generalInfoForm;

    let questionnaireJSON = JSON.stringify(this.createfinalQuestionnaire());

    this.httpService.sendQuestionnaire(questionnaireJSON).subscribe(id => {
      this.questionnaireFinal.id = id;
      this.dataExchangeService.sendData(this.questionnaireFinal);
    });

    this.router.navigateByUrl("/result");
  }

  createfinalQuestionnaire(): Questionnaire {
    const timeElapsedInSeconds = new Date().getSeconds() - this.userStartTime;
    let photos: string[] = [];
    this.images.forEach(img => { photos.push(img.imageSource) });

    this.questionnaireFinal = new Questionnaire(
      JSON.stringify(this.generalInfoForm.value["email"]), photos,
      JSON.stringify(this.cattells16Form.value), this.generalInfoForm.value["age"],
      this.generalInfoForm.value["gender"], timeElapsedInSeconds);

    return this.questionnaireFinal;
  }

  // **************** Webcam functions ****************
  checkWebcamPermission(scrollTarget) {
    if (this.webcamUserPermission === 0) {
      this.showPermissionWarning = true;
      if (scrollTarget !== undefined) {
        scrollTarget.scrollIntoView({
          behavior: "smooth"
        });
      }
    }
  }

  onWebcamPermissionDenied(scrollTarget) {
    this.webcamUserPermission = 0;
    this.showPermissionAlert = true;

    if (scrollTarget !== undefined) {
      scrollTarget.scrollIntoView({
        behavior: "smooth"
      });
    }
  }
}
