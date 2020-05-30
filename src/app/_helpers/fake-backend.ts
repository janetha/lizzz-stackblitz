import {Injectable} from '@angular/core';
import {HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {delay, mergeMap, materialize, dematerialize} from 'rxjs/operators';

import {USERS} from '../mock-users';
import {PURCHASEORDERS} from '../mock-purchase-order';
import {CLIENTS} from '../mock-clients';

// populate mock users
// USERS.map(u => {
//   localStorage.setItem('users', JSON.stringify(u));
// });
// array in local storage for registered users
let users = JSON.parse(localStorage.getItem('users')) || USERS;
let purchaseOrders = PURCHASEORDERS;
let clients = CLIENTS;

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

        // wrap in delayed observable to simulate server api call
        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
            .pipe(delay(500))
            .pipe(dematerialize());

        console.log('url=' + url);

        function handleRoute() {
            switch (true) {
                case url.endsWith('/users/authenticate') && method === 'POST':
                    return authenticate();
                case url.endsWith('/users/register') && method === 'POST':
                    return register();
                case url.endsWith('/users') && method === 'GET':
                    return getUsers();
                case url.match(/\/users\/\d+$/) && method === 'GET':
                    return getUserById();
                case url.match(/\/users\/\d+$/) && method === 'PUT':
                    return updateUser();
                case url.match(/\/users\/\d+$/) && method === 'DELETE':
                    return deleteUser();
                // case url.endsWith('/purchase-orders') && method === 'GET':
                //     return getAllPurchaseOrders();
                case url.endsWith('/purchase-orders') && method === 'POST':
                    return getPurchaseOrders();
                case url.endsWith('/purchase-orders/get-by-id') && method === 'POST':
                    return getPurchaseOrderById();
                case url.endsWith('/purchase-orders/upsert') && method === 'POST':
                    return addPurchaseOrder();
                case url.endsWith('/clients') && method === 'POST':
                    return getClients();
                case url.endsWith('/clients/search') && method === 'POST':
                    return getClientsByName();
                case url.endsWith('/clients/get-by-id') && method === 'POST':
                    return getClientById();
                case url.endsWith('/clients/get-by-ids') && method === 'POST':
                    return getClientByIds();
                case url.endsWith('/clients/upsert') && method === 'POST':
                    return upsertClient();
                default:
                    // pass through any requests not handled above
                    console.log('problem: no fake backend path match');
                    return next.handle(request);
            }
        }

        // route functions

        function authenticate() {
            const { email, password } = body;
            const user = users.find(x => x.email === email && x.password === password);

            if (!user) return error('Email or password is incorrect');
            return ok({
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                token: 'fake-jwt-token'
            })
        }

        function register() {
            const user = body;

            if (users.find(x => x.email === user.email)) {
                return error('Email address "' + user.email + '" has already been registered')
            }

            user.id = users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;
            users.push(user);
            localStorage.setItem('users', JSON.stringify(users));
            return ok();
        }

        function getUsers() {
            if (!isLoggedIn()) return unauthorized();
            return ok(users);
        }

        function getUserById() {
            if (!isLoggedIn()) return unauthorized();

            const user = users.find(x => x.id === idFromUrl());
            return ok(user);
        }

        function updateUser() {
            if (!isLoggedIn()) return unauthorized();

            let params = body;
            let user = users.find(x => x.id === idFromUrl());

            // only update password if entered
            if (!params.password) {
                delete params.password;
            }

            // update and save user
            Object.assign(user, params);
            localStorage.setItem('users', JSON.stringify(users));

            return ok();
        }

        function deleteUser() {
            if (!isLoggedIn()) return unauthorized();

            users = users.filter(x => x.id !== idFromUrl());
            localStorage.setItem('users', JSON.stringify(users));
            return ok();
        }

        // helper functions

        function ok(body?) {
            return of(new HttpResponse({ status: 200, body }))
        }

        function error(message) {
            // return throwError({ error: { message: message } });
            return throwError({ error: message });
        }

        function unauthorized() {
            return throwError({ status: 401, error: { message: 'Unauthorized' } });
        }

        function isLoggedIn() {
            return headers.get('Authorization') === 'Bearer fake-jwt-token';
        }

        function idFromUrl() {
            const urlParts = url.split('/');
            return parseInt(urlParts[urlParts.length - 1]);
        }

        function getPurchaseOrders() {
            if (!isLoggedIn()) return unauthorized();
            const page = body;
            return ok(purchaseOrders);
        }

        function getPurchaseOrderById() {
            if (!isLoggedIn()) return unauthorized();
            const id = body;
            const po = purchaseOrders.find(x => x.id === id);
            return ok(po);
        }

        function addPurchaseOrder() {
            if (!isLoggedIn()) return unauthorized();
            const po = body;
            po.id = purchaseOrders.length ? Math.max(...purchaseOrders.map(x => x.id)) + 1 : 1;
            purchaseOrders.unshift(po);
            return ok();
        }

        function getClients() {
            if (!isLoggedIn()) return unauthorized();
            const page = body;
            return ok(clients);
        }

        function getClientsByName() {
            if (!isLoggedIn()) return unauthorized();
            return ok(clients);
        }

        function getClientById() {
            if (!isLoggedIn()) return unauthorized();
            const id = body;
            const client = clients.find(x => x.id === id);
            return ok(client);
        }

        function getClientByIds() {
            if (!isLoggedIn()) return unauthorized();
            const ids = body;
            return ok(clients);
        }

        function upsertClient() {
            if (!isLoggedIn()) return unauthorized();

            const c = body;
            const client = clients.find(x => x.id === c.id);
            if (client) {
                // edit a client
                Object.assign(client, body);
            } else {
                // add a new client
                c.id = clients.length ? Math.max(...clients.map(x => x.id)) + 1 : 1;
                clients.unshift(c);
            }
            return ok();
        }
    }
}

export const fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};
