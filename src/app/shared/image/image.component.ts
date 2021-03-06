import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { WebcamService } from '../webcam/webcam.service';
import { Subscription, Subject } from 'rxjs';
import { HttpService } from '../http.service';

@Component({
  selector: 'shared-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {

  /**
   * @property imageSource : Input parameter for setting the image to be displayed
   * @property description : Input parameter for the description to be displayed below the image
   * @property buttonsNotVisible : Boolean input parameter. Hides buttons below the image if set to true. 
   */
  @Input() imageSource: string;
  @Input() imageDescription: string;
  @Input() buttonsNotVisible: boolean;

  /**
   * @property webcamRequested : Boolean output property that notifies parent component if a webcam capture has been requested
   */
  @Output() webcamRequested = new EventEmitter<boolean>();

  /**
   * @property imageElement : ViewChild that references the used <img> element in the template  
   */
  @ViewChild('image') imageElement: ElementRef<HTMLImageElement>;

  webcamServiceSubscription: Subscription;
  webcamServiceSubject: Subject<string>;
  webcamServiceEmitter: EventEmitter<Subject<string>>;

  constructor(private webcamService: WebcamService) { }

  /**
   * Calls @function updateImageSizeResponsively on window resizing.
   */
  ngOnInit() {
    window.addEventListener('resize', (() => { this.updateImageSizeResponsively(); }));

    this.webcamServiceSubject = this.webcamService.createRequestSubject();

    this.webcamServiceEmitter = this.webcamService.createRequestEmitter();

    this.webcamServiceSubscription = this.webcamServiceSubject.subscribe((imgSrc) => {
      this.imageSource = imgSrc;
    });
  }

  ngOnDestroy() {
    if (this.webcamServiceSubscription !== undefined) { this.webcamServiceSubscription.unsubscribe() };
  }

  /**
   * Asynchronously loads and displays selected image via FileReader. @property imageSource is set to a base64 string. 
   * @param selectedImage Selected image to be uploaded.
   */
  onImageUpload(selectedImage) {
    const reader = new FileReader();
    reader.readAsDataURL(selectedImage.target.files[0]);

    // let form_img = new FormData();
    // form_img.append("file", selectedImage.target.files[0], "blob.jpg");
    
    // this.httpService.postPrediction(selectedImage.target.files[0]).subscribe((response) => console.log("1: " + response));

    reader.onload = (resource: any) => {
      this.imageSource = resource.target.result; // base64 format
    };
  }

  /**
   * Calls @property webcamService to emit a capture request and notifies parent component about it
   */
  onRequestWebcamCapture() {
    this.webcamServiceEmitter.emit(this.webcamServiceSubject);
    this.webcamRequested.emit(true);

    this.updateImageSizeResponsively();
  }

  /**
   * Dynamicaly updates image height to match width and keeps the shape perfectly circular.
   * Necessary to avoid rectangular shaped elipses caused by 4:3 format of the webcam.
   */
  updateImageSizeResponsively() {
    this.imageElement.nativeElement.height = this.imageElement.nativeElement.width;
  }
}
