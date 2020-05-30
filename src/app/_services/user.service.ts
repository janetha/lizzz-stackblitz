import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { User } from '../_models/user';
import { USERS } from '../mock-users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  getAll(): Observable<User[]> {
    return of(USERS);
  }
}
