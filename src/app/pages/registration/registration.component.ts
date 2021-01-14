import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Auth, Common, Form } from '../../shared/models';
import { Store } from '@ngrx/store';
import { AuthAction, FromAuth } from '../../store';
import { CustomValidatorService } from '../../core/services/custom-validator.service';
import { filter, pluck, takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Actions, ofType } from '@ngrx/effects';
import { Md5 } from 'ts-md5';
import { IOption } from '../../shared/models/select.model';

type Controls = keyof Auth.IRegistration | keyof Auth.IRegistrationData;

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    providers: [Md5]
})
export class RegistrationComponent implements OnInit, OnDestroy {

    form: FormGroup;
    submitted = false;
    incorrectAddress = false;
    isNeedFocus = true;
    isContractNumber = true;
    registrationData: Auth.IRegistrationData;
    isRegistrationSuccess: boolean;
    incorrectData: boolean;

    @ViewChild('input') inputRef: ElementRef;

    private destroy$ = new Subject<void>();

    get FC(): Form.FormControls<Controls> {
        return this.form.controls as Form.FormControls<Controls>;
    }

    get defaultFormObj(): {[key: string]: any} {
        return {
            number: ['', [
                Validators.required,
                this.VALIDATOR.SymbolsOnly
            ]]
        };
    }

    constructor(
        private STORE: Store,
        private FB: FormBuilder,
        private ROUTER: Router,
        private ACTIONS: Actions,
        private VALIDATOR: CustomValidatorService
    ) {}

    ngOnInit(): void {
        this.ACTIONS
            .pipe(ofType(AuthAction.EType.RegisterProfileSuccess))
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => this.isRegistrationSuccess = true);

        this.ACTIONS
            .pipe(ofType(AuthAction.EType.RegisterNumberError))
            .pipe(
                pluck('error'),
                takeUntil(this.destroy$)
            )
            .subscribe((result: Common.IResultError) => {
                if (result) {
                    this.submitted = true;
                    this.FC.number.setErrors({notFound: result.error.message});
                } else {
                    this.submitted = false;
                    this.FC.number.setErrors({notFound: null});
                }
            });

        this.STORE
            .select(FromAuth.RegistrationData)
            .pipe(
                filter(data => !!data),
                takeUntil(this.destroy$)
            )
            .subscribe(data => {
                this.registrationData = data;
                this.isNeedFocus = !data;
                this.initForm({
                    email: [data.email, [Validators.required, Validators.email]],
                    phone: [data.phone, Validators.required]
                });
            });

        this.initForm(this.defaultFormObj);
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();

        this.STORE.dispatch(new AuthAction.ResetRegisterData());
    }

    initForm(formObj: {[key: string]: any}): void {
        this.form = this.FB.group(formObj);
        if (this.isNeedFocus) {
            setTimeout(() => this.inputRef.nativeElement.focus(), 100 );
        }
    }

    onSubmit(): void {
        this.submitted = true;

        if (this.form.invalid) { return; }

        this.registrationData
            ? this.STORE.dispatch(new AuthAction.RegisterProfile(this.form.value))
            : this.STORE.dispatch(new AuthAction.RegisterNumber(this.form.value.number, this.isContractNumber));

        this.submitted = false;
    }

    skip(): void {
        if (this.isContractNumber) {
            this.isContractNumber = false;
            this.FC.number.setValue('', { emitEvent: false });
            return;
        }

        window.location.href = environment.contractUrl;
    }

    cancel() {
        this.ROUTER.navigate(['../login']);
    }

    onChangeAddress(address: IOption<unknown>): void {
        const addressHash = Md5.hashStr(address.title);
        this.incorrectAddress = !(addressHash === this.registrationData.hash);

        if (this.incorrectAddress) {
            setTimeout(() => {
                this.registrationData = null;
                this.isNeedFocus = true;
                this.initForm(this.defaultFormObj);
                this.incorrectAddress = false;
            }, 10000);
        }
    }
}
