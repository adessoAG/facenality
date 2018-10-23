import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { LegalAndPrivacyComponent } from './legal-and-privacy/legal-and-privacy.component';
import { AboutComponent } from './about/about.component';

@Component({
    selector: 'app-central',
    template: `<ng-container *ngComponentOutlet="currentComponent"></ng-container>`
  })
  export class CentralRenderComponent implements OnInit {
  
    currentComponent: any;
  
    constructor(public router: Router, public activatedRoute: ActivatedRoute) { }
  
    ngOnInit() {
      if (this.router.url === '/legal-and-privacy') {
        this.currentComponent = LegalAndPrivacyComponent;
      } else {
        this.currentComponent = AboutComponent;
      }
    }
  }