import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './shared/components/top-bar/top-bar.component';
import { ContentContainer } from './pages/content/content.container';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { LoginComponent } from './pages/login/login.component';
import { environment } from '../environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { appEffects, appReducers } from './store/state/app.index';
import { ProfileCardComponent } from './pages/content/profile-card/profile-card.component';
import { TransactionTableComponent } from './pages/content/transaction-table/transaction-table.component';
import { NgxMaskModule } from 'ngx-mask';
import { PaymentComponent } from './pages/payment/payment.component';
import { RegistrationComponent } from './pages/registration/registration.component';

@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule,
        CoreModule,
        SharedModule,
        NgxMaskModule.forRoot(),
        StoreModule.forRoot(appReducers),
        EffectsModule.forRoot(appEffects),
        environment.production
            ? []
            : StoreDevtoolsModule.instrument()
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        ContentContainer,
        TopBarComponent,
        ProfileCardComponent,
        TransactionTableComponent,
        PaymentComponent,
        RegistrationComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
