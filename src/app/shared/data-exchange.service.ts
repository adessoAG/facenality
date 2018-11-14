import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Questionnaire } from '../landing-page/dynamic-form/types/questionnaire';

@Injectable({
  providedIn: 'root'
})
export class DataExchangeService {

  questionnaire: Questionnaire;
  
  // ERROR: There seems to be a loading problem when using Subject. Might be different with BehaviourSubject
  private data = new Subject<any>();

  constructor() { }

  sendData(obj: any) {
    this.data.next(obj);
  }

  getData(): Observable<any> {
    return this.data.asObservable();
  }
}
