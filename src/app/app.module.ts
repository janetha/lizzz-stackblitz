import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import { ErrorInterceptor, JwtInterceptor } from './_helpers';
import { fakeBackendProvider } from './_helpers/fake-backend';
import { RouteReuseStrategy} from '@angular/router';
import { RouteReuseStrategyService} from './_services/route-reuse-strategy.service';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        HttpClientModule,
        ComponentsModule,
        RouterModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        AdminLayoutComponent
    ],
    providers: [
        {provide: RouteReuseStrategy, useClass: RouteReuseStrategyService},
        {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},

        // provider used to create fake backend
        fakeBackendProvider,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
