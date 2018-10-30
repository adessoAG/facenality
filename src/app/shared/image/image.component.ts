import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { WebcamService } from '../webcam/webcam.service';

@Component({
  selector: 'shared-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {

  @Input() imageSource: string;
  @Input() description: string;
  @Input() buttonsNotVisible: boolean;
  @Output() webcamRequested = new EventEmitter<boolean>();
  @ViewChild('image') image: ElementRef;

  webcamServiceSubject = null;

  constructor(private webcamService: WebcamService) { }

  ngOnInit() {
    if (this.imageSource === undefined || this.imageSource === null) {
      this.imageSource = 'assets/images/howdidwegetsodark.jpg';
    }

    window.addEventListener('resize', (() => {
      this.setImageSize();
    }));
  }

  ngAfterViewInit() {
    this.webcamServiceSubject = this.webcamService.photoSubject.subscribe((src) => {
      this.imageSource = src;
      console.log("change")
    });
  }

  ngOnDestroy() {
    if (this.webcamServiceSubject !== null) { this.webcamServiceSubject.unsubscribe() };
  }

  onFileUpload(event) {
    this.imageSource = event.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(event.target.files[0]);

    reader.onload = (e: any) => {
      this.imageSource = e.target.result;
    };
  }

  onCapture() {
    this.webcamService.requestPhotoEmitter.emit(this);
    this.webcamRequested.emit(true);

    this.setImageSize();
  }

  setImageSize() {
    this.image.nativeElement.height = window.innerHeight * 0.10;
    this.image.nativeElement.height = this.image.nativeElement.width;
  }
}
