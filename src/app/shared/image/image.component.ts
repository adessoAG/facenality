import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'shared-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {

  @Input() imageSource: string;
  @Input() description: string;
  @Input() buttonsNotVisible: boolean;
  @Input() isWebcamOn: boolean = false;

  @ViewChild("video") video: ElementRef;
  @ViewChild("canvas") canvas: ElementRef;
  stream: MediaStream;

  constructor() { }

  ngOnInit() {
    this.imageSource = "assets/howdidwegetsodark.jpg";
  }

  ngAfterViewInit() {
    if (this.isWebcamOn && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
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

  onFileUpload(event) {
    this.imageSource = event.target.files[0]
    let reader = new FileReader();

    reader.readAsDataURL(event.target.files[0]);

    reader.onload = (e: any) => {
      this.imageSource = e.target.result;
    }
  }

  onCapture() {
    this.canvas.nativeElement.getContext('2d').drawImage(this.video.nativeElement, 0, 0);
    this.imageSource = this.canvas.nativeElement.toDataURL('image/png');
  }

}
