import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { QuestionControlService } from './dynamic-form/question-control.service';
import { QuestionService } from './dynamic-form/question.service';
import { QuestionBase } from './dynamic-form/types/question-base';

@Component({
  selector: 'landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  webcamUserPermission = 0;
  showPermissionAlert = false;
  showPermissionWarning = false;

  questions: QuestionBase<any>[] = [];
  form: FormGroup;
  payLoad = '';

  onPermissionDenied() {
    this.webcamUserPermission = 0;
    this.showPermissionAlert = true;
  }
  constructor(private qcs: QuestionControlService, private qs: QuestionService) {  }

  ngOnInit() {
    this.questions = this.qs.getQuestions();
    this.form = this.qcs.toFormGroup(this.questions);
  }

  checkWebcamPermission() {
    if(this.webcamUserPermission === 0) {
      this.showPermissionWarning = true;
      setTimeout(() => this.showPermissionWarning = false, 5000);
    }
  }

  closeAlert() {
    this.showPermissionAlert = false;
  }
  
  onSubmit() {
    this.payLoad = JSON.stringify(this.form.value);
    console.log("questionnaire results: " + this.payLoad);
  }
}
