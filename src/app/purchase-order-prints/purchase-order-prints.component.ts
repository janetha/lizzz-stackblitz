import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {forkJoin, from, Observable, Subscription} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';

import {PurchaseOrder} from '../_models/purchase-order';
import {PurchaseOrdersService} from '../_services/purchase-orders.service';
import {Client} from '../_models/client';
import {ClientService} from '../_services/client.service';


@Component({
  selector: 'app-purchase-order-prints',
  templateUrl: './purchase-order-prints.component.html',
  styleUrls: ['./purchase-order-prints.component.css']
})
export class PurchaseOrderPrintsComponent implements OnInit, OnDestroy {

  // private subscription: Subscription = new Subscription();
  //
  // purchaseOrder: PurchaseOrder;
  // client: Client;

  constructor(
      @Inject(MAT_DIALOG_DATA) public data: any
      // private purchaseOrderService: PurchaseOrdersService,
      // private clientService: ClientService
  ) { }

  ngOnInit(): void {
    // this.subscription.add(this.purchaseOrderService.getPurchaseOrderById(106).pipe(
    //     switchMap(p => {
    //       console.log(p);
    //       this.purchaseOrder = p;
    //       return this.clientService.getClientById(p.client.id);
    //     })).subscribe(c => {
    //       this.client = c;
    // }));
  }

  ngOnDestroy(): void {
    // this.subscription.unsubscribe();
  }
}
