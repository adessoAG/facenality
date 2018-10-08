import { Component, OnInit, Input } from '@angular/core';
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

  constructor(private webcamService: WebcamService) { }

  ngOnInit() {
    this.imageSource = "assets/howdidwegetsodark.jpg";
    this.webcamService.photoSubject.subscribe((src) => {
      this.imageSource = src;
    });
  }

  ngOnDestroy(){
    this.webcamService.photoSubject.unsubscribe();
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
    this.webcamService.requestPhotoEmitter.emit(this);
  }

}
