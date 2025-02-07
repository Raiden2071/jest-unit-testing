import { inject, Injectable } from '@angular/core';
import { UserInteface } from '../../types/user.interface';
import { UtilsService } from '../utils.service';

@Injectable()
export class UsersService {
  users: UserInteface[] = [];
  utilsService = inject(UtilsService);

  addUser(user: UserInteface): void {
    this.users = [...this.users, user];
  }

  removeUser(userId: string): void {
    const updatedUsers = this.users.filter((user: UserInteface) => user.id !== userId);
    this.users = updatedUsers;
  }

  getUserNames(): string[] {
    return this.utilsService.pluck(this.users, 'name');
  }
}
