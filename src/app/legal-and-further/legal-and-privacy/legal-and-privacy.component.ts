import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngstack/translate';

@Component({
  selector: 'legal-and-privacy',
  templateUrl: './legal-and-privacy.component.html',
  styleUrls: ['./legal-and-privacy.component.css']
})
export class LegalAndPrivacyComponent implements OnInit {

  chaptersVisible: { i: number, isVisible: boolean }[] =
    [
      { i: 0, isVisible: false },
      { i: 1, isVisible: false },
      { i: 2, isVisible: false },
      { i: 3, isVisible: false },
      { i: 4, isVisible: false },
      { i: 0, isVisible: false },
      { i: 5, isVisible: false }
    ]

  constructor(private translate: TranslateService) { }

  ngOnInit() { }

  toggleChapterVisibility(i: number) {
    this.chaptersVisible[i].isVisible = !this.chaptersVisible[i].isVisible; 
  }
}
