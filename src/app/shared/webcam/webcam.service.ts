import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { ImageComponent } from '../image/image.component';

@Injectable({
  providedIn: 'root'
})
export class WebcamService {

  /** Currently not in use. Check documentation in WebcamComponent */
  photoSubject = new Subject<string>();
  requestPhotoEmitter = new EventEmitter<ImageComponent>();

  constructor() { }
}
