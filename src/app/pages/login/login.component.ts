import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthAction, FromAuth } from '../../store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Auth, Common, Form } from '../../shared/models';
import { Observable } from 'rxjs';

type Controls = keyof Auth.ICredentials;

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

    form: FormGroup;
    submitted = false;
    error$: Observable<Common.IResultError>;

    @ViewChild('login') loginRef: ElementRef;

    get FC(): Form.FormControls<Controls> {
        return this.form.controls as Form.FormControls<Controls>;
    }

    constructor(
        private STORE: Store,
        private FB: FormBuilder
    ) {}

    ngOnInit(): void {
        this.error$ = this.STORE.select(FromAuth.Error);
        this.initForm();
    }

    initForm(): void {
        this.form = this.FB.group({
            login: ['', [Validators.required]],
            password: ['', [Validators.required]]
        });
        setTimeout(() => this.loginRef.nativeElement.focus(), 100 );
    }

    onSubmit(): void {
        this.submitted = true;

        if (this.form.invalid) { return; }

        this.STORE.dispatch(new AuthAction.Login(this.form.value));
    }
}
