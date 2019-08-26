import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { Questionnaire } from '../landing-page/dynamic-form/types/questionnaire';

@Injectable({
  providedIn: 'root'
})
export class DataExchangeService {

  questionnaire: Questionnaire;
  prediction: number [] = [];
  photos: string [] = [];

  classificationSubject = new BehaviorSubject<number []>([]);
  imageSubject = new BehaviorSubject<string>("");
  
  // ERROR: There seems to be a loading problem when using Subject. Might be different with BehaviourSubject

  constructor() { }

  sendClassification(classification: number []) {
    this.classificationSubject.next(classification);
  }

  getClassification(): Observable<number []> {
    return this.classificationSubject.asObservable();
  }

  sendImage(image: string) {
    this.imageSubject.next(image);
  }

  getImage(): Observable<string> {
    return this.imageSubject.asObservable();
  }
}
