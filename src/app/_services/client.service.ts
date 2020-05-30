import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, of, ReplaySubject} from 'rxjs';

import {environment} from '../../environments/environment';

import {Client} from '../_models/client';
import {CLIENTS} from '../mock-clients';

@Injectable({
    providedIn: 'root'
})
export class ClientService {

    subjectClients: BehaviorSubject<Client[]>;
    subjectClient = new ReplaySubject<Client>(1, 100); // 100ms enough to use once immediately

    constructor(private http: HttpClient) {
        this.subjectClients = new BehaviorSubject<Client[]>(CLIENTS);
    }

    getClientsByName(query: string): Observable<Client[]> {
        return this.http.post<Client[]>(`${environment.apiUrl}/clients/search`, {query: query});
    }

    getClients(page: number, pageSize: number): Observable<Client[]> {
        return this.subjectClients.asObservable();
    }

    getClientById(id: number): Observable<Client> {
        return this.http.post<Client>(`${environment.apiUrl}/clients/get-by-id`, id);
    }

    upsertClient(client: Client) {
        return this.http.post<any>(`${environment.apiUrl}/clients/upsert`, client);
    }

    sendClient(client: Client) {
        this.subjectClient.next(client);
    }

    getSentClient(): Observable<Client> {
        return this.subjectClient.asObservable();
    }
}
