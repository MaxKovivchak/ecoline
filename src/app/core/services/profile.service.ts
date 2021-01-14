import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Common, User } from '../../shared/models';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ProfileService {

    constructor(
        private HTTP: HttpClient
    ) { }

    getInfo(): Observable<User.IProfile> {
        return this.HTTP
            .get<Common.IResult<User.IProfile>>(`${ environment.apiUrl }/profile`)
            .pipe(
                map(data => data.result)
            );
    }

    updateInfo(httpData: Common.HttpBase<User.IProfile>): Observable<any> {
        return this.HTTP.put<any>(`${ environment.apiUrl }/profile`, httpData);
    }

}
