import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  webcamUserPermission = 0;
  showPermissionAlert = false;
  showPermissionWarning = false;

  constructor() { }

  ngOnInit() { }

  onPermissionDenied() {
    this.webcamUserPermission = 0;
    this.showPermissionAlert = true;
  }

  checkWebcamPermission() {
    if(this.webcamUserPermission === 0) {
      this.showPermissionWarning = true;
      setTimeout(() => this.showPermissionWarning = false, 5000);
    }
  }

  closeAlert() {
    this.showPermissionAlert = false;
  }
}
