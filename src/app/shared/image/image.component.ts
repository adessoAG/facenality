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

  onFileChanged(event) {
    this.imageSource = event.target.files[0]
    let reader = new FileReader();

    reader.onload = (e: any) => {
        this.imageSource = e.target.result;
    }
    reader.readAsDataURL(event.target.files[0]);
  }

}
