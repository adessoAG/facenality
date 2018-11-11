import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataExchangeService {

  private data = new Subject<any>();

  constructor() { }

  sendData(obj: any) {
    this.data.next(obj);
  }

  getData(): Observable<any> {
    return this.data.asObservable();
  }
}
