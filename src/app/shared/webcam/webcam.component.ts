import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'shared-webcam',
  templateUrl: './webcam.component.html',
  styleUrls: ['./webcam.component.css']
})
export class WebcamComponent implements OnInit {

  @ViewChild("video") video: ElementRef;
  @ViewChild("canvas") canvas: ElementRef;
  stream: MediaStream;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
        this.stream = stream;
        this.video.nativeElement.srcObject = stream;
        this.video.nativeElement.play();
        console.log("Webcam ON");
      });
    }
  }

  ngOnDestroy() {
    this.video.nativeElement.pause();
    this.stream.getTracks()[0].stop();
    console.log("Webcam OFF");
  }

}
