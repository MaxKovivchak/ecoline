import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContentContainer } from './pages/content/content.container';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './core/guards/auth.guard';
import { PaymentComponent } from './pages/payment/payment.component';
import { RegistrationComponent } from './pages/registration/registration.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'content',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'registration',
        component: RegistrationComponent
    },
    {
        path: 'content',
        component: ContentContainer,
        canActivate: [AuthGuard],
    },
    {
        path: 'payment/:type',
        component: PaymentComponent,
        canActivate: [AuthGuard],
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
