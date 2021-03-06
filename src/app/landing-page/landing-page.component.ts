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
import { TranslateService } from '@ngstack/translate';

@Component({
  selector: 'landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  dataCollectMode = false;
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

  activeLanguage: string;

  classificationResults: number[];
  imageSourceToClassify: string;

  constructor(private qcs: QuestionControlService, private qs: QuestionService, private httpService: HttpService,
    private router: Router, private dataExchangeService: DataExchangeService, private translate: TranslateService) { }

  ngOnInit() {
    this.cattells16Questions = this.qs.getQuestions();
    this.cattells16Form = this.qcs.toFormGroup(this.cattells16Questions);

    this.userStartTime = new Date().getSeconds();

    this.activeLanguage = this.translate.activeLang;
    this.translate.activeLangChanged.subscribe(lang => {
      this.activeLanguage = lang.currentValue;
    });
    
/*  // How to correctly send a POST prediction request
    let form_img = new FormData();
    form_img.append("file", this.b64toBlob(img, "image/jpeg"), "blob.jpg");
    
    this.httpService.postPrediction(form_img).subscribe((response) => console.log("1: " + response.results)); */
    }

  purifyBase64String(b64: string): string {
    return b64.substring(b64.indexOf(",") + 1);
  }

  b64toBlob (b64Data, contentType='', sliceSize=512) {
      const byteCharacters = atob(this.purifyBase64String(b64Data));
      const byteArrays = [];
    
      for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);
    
        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }
    
        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
      }
    
      const blob = new Blob(byteArrays, {type: contentType});
      return blob;
    }

  onCattells16FormComplete() {
    this.isCattells16FormComplete = true;
  }

  onSubmitForPrediction() {
    let photos: string[] = [];
    this.images.forEach(img => { photos.push(img.imageSource) });
    // let photo = JSON.stringify({ "photo" : photos[0] });
    
    let form_img = new FormData();
    form_img.append("file", this.b64toBlob(photos[0], "image/jpeg"), "predict.jpg");
    //form_img.append("file", this.images[0], "predict.jpg");
    
    //this.httpService.requestPrediction(form_img).subscribe((response) => console.log("prediction: " + response));

    this.httpService.requestPrediction(form_img).subscribe((prediction) => {
      this.dataExchangeService.prediction = prediction;
      this.dataExchangeService.photos = photos;

      this.dataExchangeService.sendClassification(prediction);
      this.dataExchangeService.sendImage(photos[0]);
      this.router.navigateByUrl("/result");

      this.classificationResults = prediction;
    });

    // Unsure if displaying results on second page
/*     this.dataExchangeService.prediction = [1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0];
    this.dataExchangeService.photos.push(photos[0]); */

    // Unsure if displaying results on same page
/*     this.imageSourceToClassify = photos[0];
    this.classificationResults = [1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0]; */
  }

  /**
   * Constructs a new @completeQuestionnaire object and uses @httpService to send it to the backend.
   */
  submitQuestionnaire(generalInfoForm: FormGroup) {
    this.generalInfoForm = generalInfoForm;

    let questionnaireJSON = JSON.stringify(this.createfinalQuestionnaire());

    this.httpService.sendQuestionnaire(questionnaireJSON).subscribe(id => {
      this.questionnaireFinal.id = id;
      this.dataExchangeService.questionnaire = this.questionnaireFinal;
      this.router.navigateByUrl("/result");
      //this.dataExchangeService.sendData(this.questionnaireFinal);
    });

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
