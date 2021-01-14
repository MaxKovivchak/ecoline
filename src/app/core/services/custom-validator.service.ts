import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class CustomValidatorService {

    SymbolsOnly(control: AbstractControl) {
        if (!/^[^`~!@#$%\^&*()_+={}|[\]\\:';"<>?,.]*$/.test(control.value)) {
            return { symbols: true };
        }
        return null;
    }

    Password(control: AbstractControl) {
        const latinExp = /^(?:(?=.*[a-z])(?=.*[A-Z]).*)$/;
        const cyrillicExp = /^(?:(?=.*[а-я])(?=.*[А-Я]).*)$/;
        if (!(latinExp.test(control.value) || cyrillicExp.test(control.value))) {
            return { incorrect: true };
        }
        return null;
    }
}
