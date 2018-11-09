import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'legal-and-privacy',
  templateUrl: './legal-and-privacy.component.html',
  styleUrls: ['./legal-and-privacy.component.css']
})
export class LegalAndPrivacyComponent implements OnInit {

  showFirstChapter = false;
  showSecondChapter = false;
  showThirdChapter = false;
  showFourthChapter = false;
  showFifthChapter = false;
  showSixthChapter = false;
  showConsentForm = false;

  constructor() { }

  ngOnInit() { }

}
