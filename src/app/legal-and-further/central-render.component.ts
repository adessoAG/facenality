import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { LegalAndPrivacyComponent } from './legal-and-privacy/legal-and-privacy.component';
import { AboutComponent } from './about/about.component';
import { FaqComponent } from './faq/faq.component';

@Component({
  selector: 'legal-central-render',
  template: `<ng-container *ngComponentOutlet="currentComponent"></ng-container>`
})
export class CentralRenderComponent implements OnInit {

  currentComponent: any;

  constructor(public router: Router, public activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    if (this.router.url === '/legal-and-privacy') {
      return this.currentComponent = LegalAndPrivacyComponent;
    }
    else if (this.router.url === '/faq') {
      return this.currentComponent = FaqComponent;
    } 
    else {
      return this.currentComponent = AboutComponent;
    }
  }
}