import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  isCamAllowed: boolean = true;
  webcamPermission = 0;

  constructor() { }

  ngOnInit() {
  }

}
