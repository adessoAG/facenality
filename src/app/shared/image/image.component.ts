import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'shared-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {

  @Input() imageSource: string;
  @Input() description: string;
  @Input() buttonsNotVisible: boolean;

  constructor() { }

  ngOnInit() {
    this.imageSource = "assets/howdidwegetsodark.jpg";
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
    /* this.canvas.nativeElement.getContext('2d').drawImage(this.video.nativeElement, 0, 0);
    this.imageSource = this.canvas.nativeElement.toDataURL('image/png'); */
  }

}
