
import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
	selector: '[appPhoneNumber]'
})

export class PhoneNumberDirective {

	phoneRegEx = /^[0-9]+(x|X){0,1}[0-9]*?$/g;

	constructor(private el: ElementRef) { }

	@HostListener('keydown', ['$event'])
	onKeyDown(event: KeyboardEvent) {
		if ([8, 9, 13, 27, 46].indexOf(event.keyCode) !== -1 ||
			// Allow: Ctrl+A
			(event.keyCode === 65 && (event.ctrlKey || event.metaKey)) ||
			// Allow: Ctrl+C
			(event.keyCode === 67 && (event.ctrlKey || event.metaKey)) ||
			// Allow: Ctrl+V
			(event.keyCode === 86 && (event.ctrlKey || event.metaKey)) ||
			// Allow: Ctrl+X
			(event.keyCode === 88 && (event.ctrlKey || event.metaKey)) ||
			// Allow: home, end, left, right
			(event.keyCode >= 35 && event.keyCode <= 39)) {
			// let it happen, don't do anything
			return;
		}
		this.validateRegEx(event);
	}

	validateRegEx(event) {
		let current: string = this.el.nativeElement.value;
		let next: string = current.concat(event.key);
		if (next && !String(next).match(this.phoneRegEx)) {
			event.preventDefault();
		}
	}

}
