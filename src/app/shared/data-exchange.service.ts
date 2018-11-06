import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Questionnaire } from '../landing-page/dynamic-form/types/questionnaire';

@Injectable({
  providedIn: 'root'
})
export class DataExchangeService {

  private data = new Subject<any>();

  constructor() { }

  sendData(obj: any) {
    this.data.next(obj);
  }

  getData() : Observable<any> {
    return this.data.asObservable();
  }
}
