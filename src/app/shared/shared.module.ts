import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [ HeaderComponent ],
  imports:      [ CommonModule ],
  exports:      [ HeaderComponent,
                  CommonModule ]
})
export class SharedModule { }
