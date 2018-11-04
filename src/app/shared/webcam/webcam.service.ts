import { Injectable, EventEmitter } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebcamService {

  private requestEmitters: EventEmitter<Subject<string>>[] = [];
  private requestSubjects: Subject<string>[] = [];

  createRequestSubject(): Subject<string> {
    const newSubject = new Subject<string>();
    this.requestSubjects.push(newSubject);
    return newSubject;
  }

  createRequestEmitter(): EventEmitter<Subject<string>> {
    const requestEmitter = new EventEmitter<Subject<string>>();
    this.requestEmitters.push(requestEmitter);
    return requestEmitter;
  }

  getRequestSubjects(): Subject<string>[] {
    return this.requestSubjects;
  }

  getRequestEmitters(): EventEmitter<Subject<string>>[] {
    return this.requestEmitters;
  }

  getWebcamCaptureRequest(subject: Subject<string>): Observable<string> {
    return subject.asObservable();
  }

  getWebcamCapture(subject: Subject<string>): Observable<string> {
    return subject.asObservable();
  }
}
