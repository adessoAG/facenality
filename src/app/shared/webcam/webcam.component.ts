import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { WebcamService } from './webcam.service';
import { ImageComponent } from '../image/image.component';
import { Subscription, Subject } from 'rxjs';

@Component({
  selector: 'shared-webcam',
  templateUrl: './webcam.component.html',
  styleUrls: ['./webcam.component.css']
})
export class WebcamComponent implements OnInit {

  @Output() permissionDenied = new EventEmitter<boolean>();

  @ViewChild('video') video: ElementRef<HTMLVideoElement>;
  @ViewChild('canvas') canvas: ElementRef<HTMLCanvasElement>;

  stream: MediaStream = null;
  resolution: {
    video: { width: { exact: number }, height: { exact: number } },
    name: string
  };
  cameraAccess = true;

  webcamServiceSubscriptions: Subscription[];
  webcamServiceSubjects: Subject<string>[];
  webcamServiceEmitters: EventEmitter<Subject<string>>[] = [];

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

      this.webcamServiceEmitters.forEach((emitter) => {
        emitter.unsubscribe();
      });
    }
  }

  startStream(stream: MediaStream) {
    this.stream = stream;
    this.video.nativeElement.srcObject = stream;
    this.video.nativeElement.play();
    this.setWebcamSize();

    this.webcamServiceEmitters = this.webcamService.getRequestEmitters();

    this.webcamServiceEmitters.forEach((emitter) => {
      emitter.subscribe((subject: Subject<string>) => {
        // Set canvas size according to given resolution
        this.canvas.nativeElement.width = this.resolution.video.width.exact;
        this.canvas.nativeElement.height = this.resolution.video.height.exact;

        this.canvas.nativeElement.getContext('2d').drawImage(this.video.nativeElement, 0, 0);
        subject.next(this.canvas.nativeElement.toDataURL('image/jpeg'));
      })
    })
  }

  /**
   * Dynamicaly updates webcam height to match width and keep the shape perfectly circular.
   * Necessary to avoid rectangular shaped elipses caused by 4:3 format of the webcam.
   * TODO: Make responsive
   */
  setWebcamSize() {
    const size = 250;
    this.video.nativeElement.height = size;
    this.video.nativeElement.width = size;
  }

  /** Check if browser supports webcam access */
  hasGetUserMedia() {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
  }

}
