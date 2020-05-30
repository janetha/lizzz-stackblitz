import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {forkJoin, from, Observable, Subscription} from 'rxjs';
import {first, flatMap, map, mergeMap, switchMap} from 'rxjs/operators';
import {PageEvent} from '@angular/material/paginator';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';

import {User} from '../_models/user';
import {AccountService} from '../_services';
import {PurchaseOrder, PurchaseOrderStatus} from '../_models/purchase-order';
import {PurchaseOrdersService} from '../_services/purchase-orders.service';
import {PurchaseOrderPrintsComponent} from '../purchase-order-prints/purchase-order-prints.component';

@Component({
    selector: 'app-purchase-orders',
    templateUrl: './purchase-orders.component.html',
    styleUrls: ['./purchase-orders.component.css']
})
export class PurchaseOrdersComponent implements OnInit, OnDestroy {

    private subscription: Subscription = new Subscription();

    users$: Observable<User[]>;
    users: User[];
    purchaseOrders: PurchaseOrder[];
    pageLength = 100;
    pageSize = 10;
    pageIndex = 0;
    pageSizeOptions: number[] = [2, 5, 10, 25, 100];
    pageEvent: PageEvent;
    showSearchArea = false;
    statusKeys: Array<string> = Object.keys(PurchaseOrderStatus).filter(key => isNaN(+key));

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private purchaseOrderService: PurchaseOrdersService,
        public dialog: MatDialog
    ) {
    }

    ngOnInit(): void {
        this.getPurchaseOrders(this.pageIndex);
    }

    getPurchaseOrders(pageIndex: number) {
        this.subscription.add(forkJoin(
            this.accountService.getAll(),
            this.purchaseOrderService.getPurchaseOrders(pageIndex, this.pageSize))
            .subscribe(([u, po]) => {
                this.users = u;
                this.purchaseOrders = po;
        }));
    }

    getUserName(id: number) {
        if (this.users) {
            const user = this.users.find(u => {
                return u.id === id;
            });
            return user ? user.firstName + ' ' + user.lastName : id.toString();
        } else {
            return id.toString();
        }
    }

    getPage(event?: PageEvent) {
        if (event) {
            this.getPurchaseOrders(event.pageIndex);
        }
        return event;
    }

    updateStatus(po: PurchaseOrder, option: string) {
        console.log(option);
        console.log(this.statusKeys.findIndex(o => {return o === option}));
    }

    openDialog(po: PurchaseOrder, type: string) {
        this.dialog.open(PurchaseOrderPrintsComponent, {
            data: {
                type: type,
                purchaseOrder: po,
                client: {},
                supplier: {}
            },
            width: '95%'
        });
      }

    editPurchaseOrder(po: PurchaseOrder) {
        this.purchaseOrderService.sendPurchaseOrder(po);
        // this.router.navigate(['/purchase-order-add'], {queryParams: {id: po.id}});
        this.router.navigate(['/purchase-order-add']);
    }

    testSubmit() {
        // const po: PurchaseOrder = {
        //     id: 0,
        //     userId: 1,
        //     date: new Date(2020, 5, 17),
        //     clientId: 1,
        //     clientName: 'Bambi',
        //     title: '4,000 new leaves'
        // };
        // this.purchaseOrderService.upsertPurchaseOrder(po)
        //     .pipe(first())
        //     .subscribe(x => {});
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
