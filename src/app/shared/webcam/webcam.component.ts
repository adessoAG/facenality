import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { WebcamService } from './webcam.service';
import { ImageComponent } from '../image/image.component';

@Component({
  selector: 'shared-webcam',
  templateUrl: './webcam.component.html',
  styleUrls: ['./webcam.component.css']
})
export class WebcamComponent implements OnInit {

  @Output() permissionDenied = new EventEmitter<boolean>();

  @ViewChild('video') video: ElementRef;
  @ViewChild('canvas') canvas: ElementRef;

  stream: MediaStream = null;
  webcamServiceSubject = null;

  constructor(private webcamService: WebcamService) { }

  ngOnInit() { }

  ngAfterViewInit() {
    /**
     * Turns on the camera after checking for permission
     */
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
        this.stream = stream;
        this.video.nativeElement.srcObject = stream;
        this.video.nativeElement.play();

        /**
         * Subscribes to photo requests and receives reference of calling component,
         * which is used to return the snapshot. Might not be the "angular way".
         *
         * Problem using photoSubject.emit() is that instead of the calling instance,
         * ALL ImageComponents receive the snapshot.
         */
        this.webcamServiceSubject = this.webcamService.requestPhotoEmitter.subscribe((imgCmp: ImageComponent) => {
          this.canvas.nativeElement.getContext('2d').drawImage(this.video.nativeElement, 0, 0);
          imgCmp.imageSource = this.canvas.nativeElement.toDataURL('image/png');
          /* this.webcamService.photoSubject.emit(this.canvas.nativeElement.toDataURL('image/png')); */
        });
        console.log('Webcam ON');
      }).catch(reason => {
        this.permissionDenied.emit(true);
        console.log(reason);
      });
    }
  }

  ngOnDestroy() {
    if (this.stream !== null) {
      this.video.nativeElement.pause();
      this.stream.getTracks()[0].stop();

      if (this.webcamServiceSubject !== null) { this.webcamServiceSubject.unsubscribe() };
      console.log('Webcam OFF');
    }
  }
}
