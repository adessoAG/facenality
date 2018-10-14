import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngstack/translate';

@Component({
  selector: 'shared-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private translate: TranslateService) { }

  ngOnInit() {
  }

  setLang(lang: string) {
    this.translate.activeLang = lang;
    console.log("Switching to language: " + lang);
  }

}
