import { Injector } from '@angular/core';

export let AppInjector: Injector;

export function setAppInjector(injector?: Injector): Injector {
    if (injector) {
        AppInjector = injector;
    }

    return AppInjector;
}
