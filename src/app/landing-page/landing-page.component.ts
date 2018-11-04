import { Component, OnInit, ViewChild, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { QuestionControlService } from './dynamic-form/question-control.service';
import { QuestionService } from './dynamic-form/question.service';
import { HttpService } from '../shared/http.service';
import { QuestionBase } from './dynamic-form/types/question-base';
import { Questionnaire } from './dynamic-form/types/questionnaire';
import { ImageComponent } from '../shared/image/image.component';

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
  cattells16QuestionsForm: FormGroup;
  questionnaireComplete: Questionnaire = null;

  userStartTime: number;

  @ViewChildren(ImageComponent) images: QueryList<ImageComponent>

  constructor(private qcs: QuestionControlService, private qs: QuestionService, private httpService: HttpService) { }

  ngOnInit() {
    this.cattells16Questions = this.qs.getQuestions();
    this.cattells16QuestionsForm = this.qcs.toFormGroup(this.cattells16Questions);

    this.userStartTime = new Date().getSeconds();
  }

  /**
   * Constructs a new @completeQuestionnaire object and uses @httpService to send it to the backend.
   * Backend replies with an ID and
   * TODO: predicted results for @cattells16QuestionsForm 
   * TODO: Data is passed as parameter while user is being routed to ResultComponent
   * TODO: Restrict data being send multiple times
   */
  onSubmit() {
    const timeElapsedInSeconds = new Date().getSeconds() - this.userStartTime;
    let photos :string[] = [];
    this.images.forEach(img => { photos.push(img.imageSource) });

    this.questionnaireComplete = new Questionnaire("sergej@grilborzer.de", photos, JSON.stringify(this.cattells16QuestionsForm.value), 23, 0, timeElapsedInSeconds);
    let questionnaireJSON = JSON.stringify(this.questionnaireComplete);

    console.log(`Questionnaire: ${questionnaireJSON} took ${timeElapsedInSeconds} seconds`);

    this.httpService.sendQuestionnaire(questionnaireJSON).subscribe(id => {
      this.questionnaireComplete.id = id;
    });
  }

  // **************** Webcam functions ****************
  checkWebcamPermission() {
    if (this.webcamUserPermission === 0) {
      this.showPermissionWarning = true;
      setTimeout(() => this.showPermissionWarning = false, 5000);
    }
  }

  onWebcamPermissionDenied() {
    this.webcamUserPermission = 0;
    this.showPermissionAlert = true;
  }

  closeWebcamPermissionAlert() {
    this.showPermissionAlert = false;
  }
}
