import { AfterViewInit, Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';

const DISABLED = 'disabled';
const APP_DISABLED = 'app-disabled';
const TAB_INDEX = 'tabindex';
const TAG_ANCHOR = 'a';

@Directive({
  selector: '[appDisable]'
})
export class DisableDirective implements OnChanges, AfterViewInit {

  @Input() appDisable = true;

  constructor(private eleRef: ElementRef, private renderer: Renderer2) { }

  ngOnChanges() {
    this.disableElement(this.eleRef.nativeElement);
  }

  ngAfterViewInit() {
    this.disableElement(this.eleRef.nativeElement);
  }

  private disableElement(element: any) {
    if (this.appDisable) {
      if (!element.hasAttribute(DISABLED)) {
        this.renderer.setAttribute(element, APP_DISABLED, '');
        this.renderer.setAttribute(element, DISABLED, 'true');
         this.renderer.setStyle(element, 'pointer-events', 'none');
      this.renderer.setStyle(element, 'opacity', '0.5');
      this.renderer.setStyle(element, 'background-color', '#e0e0e0'); // Light gray
        // disabling anchor tab keyboard event
        if (element.tagName.toLowerCase() === TAG_ANCHOR) {
          this.renderer.setAttribute(element, TAB_INDEX, '-1');
        }

        
      }
    } else {
      if (element.hasAttribute(APP_DISABLED)) {
        if (element.getAttribute('disabled') !== '') {
          element.removeAttribute(DISABLED);
            // Revert styles
      this.renderer.removeStyle(element, 'pointer-events');
      this.renderer.removeStyle(element, 'opacity');
      this.renderer.removeStyle(element, 'background-color');
        }
        element.removeAttribute(APP_DISABLED);
        if (element.tagName.toLowerCase() === TAG_ANCHOR) {
          element.removeAttribute(TAB_INDEX);
            // Revert styles
      this.renderer.removeStyle(element, 'pointer-events');
      this.renderer.removeStyle(element, 'opacity');
      this.renderer.removeStyle(element, 'background-color');
        }
      }
    }
    if (element.children) {
      for (let ele of element.children) {
        this.disableElement(ele);
      }
    }
  }
}