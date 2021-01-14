import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoaderComponent } from './components/loader/loader.component';
import { SelectComponent } from './components/select/select.component';
import { OutsideClickDirective } from './directives/outside-click.directive';
import { InfiniteScrollDirective } from './directives/infinite-scroll.directive';

const SHARED_DIRECTIVES = [
    OutsideClickDirective,
    InfiniteScrollDirective
];

const SHARED_COMPONENTS = [
    LoaderComponent,
    SelectComponent,
];

const SHARED_MODULES = [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
];

@NgModule({
    declarations: [
        ...SHARED_DIRECTIVES,
        ...SHARED_COMPONENTS,
    ],
    imports: [
        ...SHARED_MODULES
    ],
    exports: [
        ...SHARED_MODULES,
        ...SHARED_DIRECTIVES,
        ...SHARED_COMPONENTS,
    ]
})

export class SharedModule {
}
