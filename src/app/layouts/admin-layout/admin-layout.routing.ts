import {Routes} from '@angular/router';

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

export const AdminLayoutRoutes: Routes = [
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component: UserProfileComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }]
    // }
    // {
    //     path: 'account',
    //     loadChildren: '../../account/account.module#AccountModule'
    // },
    {path: 'purchase-orders', component: PurchaseOrdersComponent, data: {reuse: true}},
    {path: 'purchase-order-add', component: PurchaseOrderAddComponent, data: {reuse: true}},
    {path: 'print', component: PurchaseOrderPrintsComponent},
    {path: 'clients', component: ClientsComponent},
    {path: 'client-add', component: ClientAddComponent},
    {path: 'suppliers', component: SuppliersComponent},
    {path: 'supplier-add', component: SupplierAddComponent},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'user-profile', component: UserProfileComponent},
    {path: 'table-list', component: TableListComponent},
    {path: 'typography', component: TypographyComponent},
    {path: 'icons', component: IconsComponent},
    {path: 'notifications', component: NotificationsComponent},
];
