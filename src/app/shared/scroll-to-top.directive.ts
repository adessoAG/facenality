import { Directive } from '@angular/core';

@Directive({
  selector: '[scrollToTop]'
})
export class ScrollToTopDirective {

  constructor() { }

  ngOnInit() {
    window.scrollTo(0, 0);
  }
}
