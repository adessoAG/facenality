import { Component } from '@angular/core';
import { TranslateService } from '@ngstack/translate';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  loading = false;

  constructor(private translateService: TranslateService) {}

  ngOnInit() {
    this.translateService.activeLangChanged.subscribe(() => {
      this.loading = true;
      setTimeout(()=>{ this.loading = false; }, 700);
    });
  }
}
