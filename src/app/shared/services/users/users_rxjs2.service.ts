import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserInteface } from '../../types/user.interface';

@Injectable()
export class UserRXJS2Service {
  users$ = new BehaviorSubject<UserInteface[]>([]);

  addUser(user: UserInteface): void {
    this.users$.next([...this.users$.getValue(), user]);
  }

  removeUser(userId: string): void {
    const updatedUsers = this.users$
      .getValue()
      .filter((user: UserInteface) => user.id !== userId);
    this.users$.next(updatedUsers);
  }
}
