import { Injectable } from '@angular/core';
import { Common } from '../../shared/models';

@Injectable({
    providedIn: 'root'
})
export class SessionStorageService {

    setValue(key: Common.ELocalStorageKey, value: any): void {
        sessionStorage.setItem(key, JSON.stringify(value));
    }

    getValue<R>(key: Common.ELocalStorageKey): R {
        return JSON.parse(sessionStorage.getItem(key)) as R;
    }

    removeValue(key: Common.ELocalStorageKey): void {
        sessionStorage.removeItem(key);
    }

    clearStorage(): void {
        sessionStorage.clear();
    }
}
