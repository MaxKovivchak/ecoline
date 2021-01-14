import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Store } from '@ngrx/store';
import { FromAuth } from '../../store';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    token: string;

    constructor(
        private authService: AuthService,
        private router: Router,
        private STORE: Store
    ) {}

    canActivate(): Observable<boolean> {
        this.STORE
            .select(FromAuth.Token)
            .subscribe(token => {
                this.token = token;
                if (!this.token) {
                    this.router.navigate(['./login']);
                }
            });

        return of(!!this.token);
    }
}
