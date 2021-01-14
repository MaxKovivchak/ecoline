import { AfterViewInit, Directive, ElementRef, EventEmitter, NgZone, OnDestroy, Output } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

@Directive({
    selector: '[appInfiniteScroll]'
})
export class InfiniteScrollDirective implements AfterViewInit, OnDestroy {

    @Output() byLoad = new EventEmitter<{}>();

    private destroy$ = new Subject<void>();

    constructor(
        private REF: ElementRef<HTMLUListElement>,
        private ZONE: NgZone
    ) { }

    get el(): HTMLUListElement { return this.REF.nativeElement; }

    ngAfterViewInit(): void {
        this.ZONE.runOutsideAngular(() => {
            fromEvent(this.el, 'scroll')
                .pipe(
                    debounceTime(600),
                    takeUntil(this.destroy$)
                )
                .subscribe(() => {
                    this.onScroll();
                });
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    onScroll(): void {
        if (this.needToLoad) {
            this.ZONE.run(() => this.byLoad.next());
        }
    }

    private get needToLoad(): boolean {
        return (this.el.scrollTop + this.el.clientHeight + 2 > this.el.scrollHeight);
    }

}
