import { TestBed } from "@angular/core/testing";
import { UserRXJS2Service } from "./users_rxjs2.service";
import { UtilsService } from "../utils.service";
import { UserInteface } from "../../types/user.interface";


describe('UserService', () => {
    let userService: UserRXJS2Service;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [UserRXJS2Service, UtilsService],
        });

        userService = TestBed.inject(UserRXJS2Service);
    });

    it('creates a service', () => {
        expect(userService).toBeTruthy();
    });

    describe('AddUser', () => {
        it('should add a user', () => {
            const user: UserInteface = {
                id: '3',
                name: 'foo',
            };

            userService.addUser(user);
            expect(userService.users$.getValue()).toEqual([{id: '3', name: 'foo'}]);
        });
    });

    describe('RemoveUser', () => {
        it('should remove a user', () => {
            userService.users$.next([{ id: '3', name: 'foo'}]);
            const userId: string = '3';

            userService.removeUser(userId);
            expect(userService.users$.getValue()).toEqual([]);
        });
    });
});
