import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { Injector, NgModule, Optional, SkipSelf } from '@angular/core';
import { setAppInjector } from './services/app-injector.service';
import { HttpErrorInterceptor } from './services/http-error-interceptor.service';
import { AuthInterceptorService } from './services/auth-interceptor.service';

@NgModule({
    imports: [
        HttpClientModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptorService,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpErrorInterceptor,
            multi: true
        },
    ],
})
export class CoreModule {

    constructor(
        INJECTOR: Injector,
        @Optional() @SkipSelf() parentModule: CoreModule
    ) {
        setAppInjector(INJECTOR);
        if (parentModule) {
            throw new Error('CoreModule is already loaded. Import it in the AppModule only');
        }
    }

}
