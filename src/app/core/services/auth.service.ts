import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Auth, Common } from '../../shared/models';
import { environment } from '../../../environments/environment';
import { DateUtils } from '../../shared/utils/date.util';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        private HTTP: HttpClient
    ) { }

    login(httpData: Common.HttpBase<Auth.ICredentials>): Observable<Common.IResult<Auth.IToken>> {
        const headers = new HttpHeaders()
            .set('WithoutCredentials', 'true')
            .set('X-Id', DateUtils.timeStamp());
        return this.HTTP.post<Common.IResult<Auth.IToken>>(`${ environment.apiUrl }/session`, httpData, { headers });
    }

    logout(): Observable<any> {
        const headers = new HttpHeaders().set('IBSession', 'finish');
        return this.HTTP.delete<any>(`${ environment.apiUrl }/session`, { headers });
    }

    registerNumber(value: string): Observable<Auth.IRegistrationData> {
        const headers = new HttpHeaders()
            .set('WithoutCredentials', 'true')
            .set('X-Id', DateUtils.timeStamp());
        return this.HTTP
            .post<Auth.IRegistrationData>(`${ environment.apiUrl }/contract`, { number: value } , { headers })
            .pipe(
                map(data => {
                    data.addresses = data.addresses.map((address, index) => ({
                        id: Date.now() + index,
                        title: address,
                        isSelected: false
                    }));
                    return data;
                })
            );
    }

    registerProfile(data: Partial<Auth.IRegistrationData>): Observable<unknown> {
        const headers = new HttpHeaders()
            .set('WithoutCredentials', 'true')
            .set('X-Id', DateUtils.timeStamp());
        return this.HTTP
            .post<Common.IResult<Auth.IRegistrationData>>(`${ environment.apiUrl }/registration`, data, { headers } )
            .pipe(
                map(response => response.result)
            );
    }

}
