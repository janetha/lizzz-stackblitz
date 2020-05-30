import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, of, ReplaySubject} from 'rxjs';

import {environment} from '../../environments/environment';

import {PurchaseOrder} from '../_models/purchase-order';
import {PURCHASEORDERS} from '../mock-purchase-order';

@Injectable({
    providedIn: 'root'
})
export class PurchaseOrdersService {

    subjectPos: BehaviorSubject<PurchaseOrder[]>;
    subjectPo = new ReplaySubject<PurchaseOrder>(1);

    constructor(private http: HttpClient) {
        this.subjectPos = new BehaviorSubject<PurchaseOrder[]>(PURCHASEORDERS);
    }

    getPurchaseOrders(page: number, pageSize: number): Observable<PurchaseOrder[]> {
        // not working when using forkJoin().subscribe but works with [observable].subscribe
        // return this.subjectPos.asObservable();
        return this.http.post<PurchaseOrder[]>(`${environment.apiUrl}/purchase-orders`, {page: page, pageSize: pageSize});
    }

    getPurchaseOrderById(id: number): Observable<PurchaseOrder> {
        return this.http.post<PurchaseOrder>(`${environment.apiUrl}/purchase-orders/get-by-id`, id);
    }

    upsertPurchaseOrder(po: PurchaseOrder) {
        return this.http.post<any>(`${environment.apiUrl}/purchase-orders/upsert`, po);
    }

    sendPurchaseOrder(po: PurchaseOrder) {
        this.subjectPo.next(po);
    }

    getSentPurchaseOrder(): Observable<PurchaseOrder> {
        return this.subjectPo.asObservable();
    }
}
