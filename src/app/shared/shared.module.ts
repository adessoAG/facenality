import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { ImageComponent } from './image/image.component';
import { FormsModule } from '@angular/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WebcamComponent } from './webcam/webcam.component';
import { TranslateModule } from '@ngstack/translate';

@NgModule({
  declarations: [HeaderComponent, ImageComponent, WebcamComponent],
  imports: [CommonModule, FormsModule, NgbModule, TranslateModule.forChild(),
    AngularFontAwesomeModule,],
  exports: [HeaderComponent, ImageComponent, WebcamComponent,
    CommonModule, FormsModule, NgbModule, TranslateModule,
    AngularFontAwesomeModule,]
})
export class SharedModule { }
