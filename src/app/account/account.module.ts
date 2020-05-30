import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

import {AccountRoutingModule} from './account-routing.module';
import {LayoutComponent} from './layout.component';
import {LoginComponent} from './login.component';
import {RegisterComponent} from './register.component';
import {AlertComponent} from '../_components';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatRippleModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatTooltipModule,
        MatPaginatorModule,
        MatIconModule,
        MatDatepickerModule,
        MatNativeDateModule,
        AccountRoutingModule
    ],
    declarations: [
        AlertComponent,
        LayoutComponent,
        LoginComponent,
        RegisterComponent,
    ]
})
export class AccountModule {
}
