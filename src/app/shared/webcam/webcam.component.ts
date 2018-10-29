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
  resolution: {
    video: { width: { exact: number }, height: { exact: number } },
    name: string
  };
  cameraAccess = true;

  constructor(private webcamService: WebcamService) { }

  ngOnInit() { }

  ngAfterViewInit() {
    const vgaConstraints = {
      video: { width: { exact: 640 }, height: { exact: 480 } }, name: "VGA"
    };
    const hdConstraints = {
      video: { width: { exact: 1280 }, height: { exact: 720 } }, name: "HD"
    };

    // TODO: To be refactored and simplified. Too much code repetition
    if (this.hasGetUserMedia()) {
      // Try using HD resolution befor falling back to VGA
      this.resolution = hdConstraints;
      navigator.mediaDevices.getUserMedia(this.resolution)
        .then(stream => {
          this.startStream(stream);
        })
        .catch(reason => {
          this.permissionDenied.emit(true);
          console.log(reason);
        });

      if (!this.cameraAccess) {
        this.resolution = vgaConstraints;
        navigator.mediaDevices.getUserMedia(this.resolution)
          .then(stream => {
            this.startStream(stream);
          })
          .catch(reason => {
            this.permissionDenied.emit(true);
            console.log(reason);
          });
      }

    } else {
      console.log('Webcam access via getUserMedia() is not supported by your browser. Please update existing or install Firefox.');
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

  startStream(stream: MediaStream) {
    this.stream = stream;
    this.video.nativeElement.srcObject = stream;
    this.video.nativeElement.play();
    this.setWebcamSize();

    this.webcamServiceSubject = this.webcamService.requestPhotoEmitter.subscribe((imgCmp: ImageComponent) => {
      this.canvas.nativeElement.getContext('2d').drawImage(this.video.nativeElement, 0, 0);
      imgCmp.imageSource = this.canvas.nativeElement.toDataURL('image/png');

    });
    console.log('Webcam ON');
  }

  // TODO: responsive
  setWebcamSize() {
    const size = 250;
    this.video.nativeElement.height = size;
    this.video.nativeElement.width = size;
  }

  hasGetUserMedia() {
    return !!(navigator.mediaDevices &&
      navigator.mediaDevices.getUserMedia);
  }

}
