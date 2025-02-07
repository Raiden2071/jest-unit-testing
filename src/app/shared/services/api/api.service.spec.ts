import { TestBed } from "@angular/core/testing";
import { ApiService } from "./api.service";
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { TagInterface } from "../../types/tag.interface";
import { HttpErrorResponse, provideHttpClient } from "@angular/common/http";

describe('ApiService', () => {
    let apiService: ApiService;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ApiService,
                provideHttpClient(),
                provideHttpClientTesting(),
            ],
        });

        apiService = TestBed.inject(ApiService);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    afterEach(() => { //вызываем после каждого теста
        httpTestingController.verify();  //verify no unmatched requests are outstading
        // короче говоря ресетаем тесты
    });

    it('creates a service', () => {
        expect(apiService).toBeTruthy();
    });

    describe(('getTags'), () => {
        it('should return a list of tags', () => {
            let tags: TagInterface[] | undefined;
            apiService.getTags().subscribe(response => {
                tags = response;
            });
            const req = httpTestingController.expectOne(
                'http://localhost:3004/tags',
            );
            req.flush([{id: '1', name: 'foo'}]);

            expect(tags).toEqual([{id: '1', name: 'foo'}]);
        });
    });

    describe('createTag', () => {
        it('should create a tag', () => {
            let tag: TagInterface | undefined;
            apiService.createTag('foo').subscribe(response => {
                tag = response;
            });
            const req = httpTestingController.expectOne(
                'http://localhost:3004/tags',
            );
            req.flush({id: '1', name: 'foo'});
    
            expect(tag).toEqual({id: '1', name: 'foo'});
        });

        // We can do this, but we don't promise that your code will be safer.
        it('passes the correact body', () => {
            let tag: TagInterface | undefined;
            apiService.createTag('foo').subscribe(response => {
                tag = response;
            });
            const req = httpTestingController.expectOne('http://localhost:3004/tags');
            req.flush({id: '1', name: 'foo'});
    
            expect(req.request.method).toEqual("POST");
            expect(req.request.body).toEqual({ name: 'foo' });
        });

        it('throws the error, if the request fails', () => {
            let actualError: HttpErrorResponse | undefined;

            apiService.createTag('foo').subscribe({
                next: () => {
                    fail('Success should not be called');
                },
                error: (err) => {
                    actualError = err;
                },
            });

            const req = httpTestingController.expectOne('http://localhost:3004/tags');
            req.flush('Server error', {
                status: 422,
                statusText: 'Unprocessible entity',
            });

            if (!actualError) {
                throw new Error('Error needs tobe defined');
            }

            expect(actualError.status).toEqual(422);
            expect(actualError.statusText).toEqual('Unprocessible entity');
        });
    });
});       