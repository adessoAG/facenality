import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { TranslateModule, TranslateService } from '@ngstack/translate';

import { AppRoutingModule } from './app-routing.module';
import { LandingPageModule } from './landing-page/landing-page.module';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';

// needed to load translation before application starts
export function setupTranslateService(service: TranslateService) {
  return () => service.load();
}


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      activeLang: 'de'
    }),
    LandingPageModule,
    SharedModule
  ],
  providers: [
    // needed to load translation before application starts
    {
      provide: APP_INITIALIZER,
      useFactory: setupTranslateService,
      deps: [TranslateService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
