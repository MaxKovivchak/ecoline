import { Injectable } from '@angular/core';
import { Common } from '../../shared/models';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {

    setValue(key: Common.ELocalStorageKey, value: any): void {
        localStorage.setItem(key, JSON.stringify(value));
    }

    getValue<R>(key: Common.ELocalStorageKey): R {
        return JSON.parse(localStorage.getItem(key)) as R;
    }

    removeValue(key: Common.ELocalStorageKey): void {
        localStorage.removeItem(key);
    }

    clearStorage(): void {
        localStorage.clear();
    }
}
