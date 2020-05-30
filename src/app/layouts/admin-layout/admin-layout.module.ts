import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AdminLayoutRoutes} from './admin-layout.routing';
import {PurchaseOrdersComponent} from '../../purchase-orders/purchase-orders.component';
import {PurchaseOrderAddComponent} from '../../purchase-order-add/purchase-order-add.component';
import {PurchaseOrderPrintsComponent} from '../../purchase-order-prints/purchase-order-prints.component';
import {ClientsComponent} from '../../clients/clients.component';
import {ClientAddComponent} from '../../client-add/client-add.component';
import {SuppliersComponent} from '../../suppliers/suppliers.component';
import {SupplierAddComponent} from '../../supplier-add/supplier-add.component';
import {DashboardComponent} from '../../dashboard/dashboard.component';
import {UserProfileComponent} from '../../user-profile/user-profile.component';
import {TableListComponent} from '../../table-list/table-list.component';
import {TypographyComponent} from '../../typography/typography.component';
import {IconsComponent} from '../../icons/icons.component';
import {NotificationsComponent} from '../../notifications/notifications.component';
import {UpgradeComponent} from '../../upgrade/upgrade.component';
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
import {MatDividerModule} from '@angular/material/divider';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatMenuModule} from '@angular/material/menu';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
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
        MatDividerModule,
        MatCheckboxModule,
        MatAutocompleteModule,
        MatMenuModule,
        MatDialogModule,
        MatSnackBarModule,
        RouterModule.forChild(AdminLayoutRoutes),
    ],
    declarations: [
        PurchaseOrdersComponent,
        PurchaseOrderAddComponent,
        PurchaseOrderPrintsComponent,
        ClientsComponent,
        ClientAddComponent,
        SuppliersComponent,
        SupplierAddComponent,
        DashboardComponent,
        UserProfileComponent,
        TableListComponent,
        TypographyComponent,
        IconsComponent,
        NotificationsComponent,
        UpgradeComponent,
    ]
})

export class AdminLayoutModule {
}
