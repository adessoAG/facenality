import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngstack/translate';

@Component({
  selector: 'shared-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  activeLanguage;

  constructor(private translate: TranslateService) { }

  ngOnInit() {
    this.activeLanguage = this.translate.activeLang;
  }

  setLang(lang: string) {
    this.translate.activeLang = lang;
    this.activeLanguage = lang;
  }

}
