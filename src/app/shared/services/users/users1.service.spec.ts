import { TestBed } from "@angular/core/testing";
import { UsersService } from "./users1.service";
import { UtilsService } from "../utils.service";
import { UserInteface } from "../../types/user.interface";


describe('UserService', () => {
    let userService: UsersService;
    const utilsServiceMock = {
        pluck: jest.fn(),
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [UsersService, {
                provide: UtilsService, useValue: utilsServiceMock,
            }],
        });

        userService = TestBed.inject(UsersService);
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
            expect(userService.users).toEqual([{id: '3', name: 'foo'}]);
        });
    });

    describe('RemoveUser', () => {
        it('should remove a user', () => {
            userService.users = [{ id: '3', name: 'foo'}];
            const userId: string = '3';

            userService.removeUser(userId);
            expect(userService.users).toEqual([]);
        });
    });

    describe('getUserNames', () => {
        it('should get user names', () => {
            // userService.users = [{ id: '3', name: 'foo'}];
            utilsServiceMock.pluck.mockReturnValue(['foo']);

            expect(userService.getUserNames()).toEqual(['foo']);
        });
    });
});
