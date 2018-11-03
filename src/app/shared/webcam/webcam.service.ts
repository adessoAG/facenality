import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { ImageComponent } from '../image/image.component';

@Injectable({
  providedIn: 'root'
})
export class WebcamService {

  requestPhotoEmitter = new EventEmitter<ImageComponent>();

}
