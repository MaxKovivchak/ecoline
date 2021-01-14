import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
    selector: `[appOutsideClick]`
})

export class OutsideClickDirective {

    @Output() clickedOutside = new EventEmitter();

    constructor(private ELEMENT: ElementRef<HTMLElement>) {}

    @HostListener('document:click', ['$event'])
    onClick(e: Event): void {
        const target = (e.target as HTMLElement);

        const clickedInside: boolean = this.ELEMENT.nativeElement.contains(target);
        if (!clickedInside) {
            this.clickedOutside.emit();
        }
    }

}
