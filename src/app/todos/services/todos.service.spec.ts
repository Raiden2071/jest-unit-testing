import { TestBed } from '@angular/core/testing';
import { TodosService } from './todos.service';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { FilterEnum } from '../types/filter.enum';
import { TodoInterface } from '../types/todo.interface';

describe('TodosService', () => {
  let todosService: TodosService;
  let httpTestingController: HttpTestingController;
  const baseUrl = 'http://localhost:3004/todos';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TodosService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    todosService = TestBed.inject(TodosService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify(); //verify no unmatched requests are outstading
    // короче говоря ресетаем тесты
  });

  it('creates a service', () => {
    expect(todosService).toBeTruthy();
  });

  it('sets initial data', () => {
    expect(todosService.apiBaseUrl).toEqual(todosService.apiBaseUrl);
    expect(todosService.todosSig()).toEqual([]);
    expect(todosService.filterSig()).toEqual(FilterEnum.all);
  });

  describe('changeFilter', () => {
    it('changes the filter', () => {
      todosService.filterSig.set(FilterEnum.all);
      let filterNameSignal = FilterEnum.active;

      todosService.changeFilter(filterNameSignal);
      expect(todosService.filterSig()).toEqual(FilterEnum.active);
    });
  });

  describe('getTodos', () => {
    it('gets correct todos data', () => {
      todosService.getTodos();
      const req = httpTestingController.expectOne(baseUrl);
      req.flush([{ id: '1', text: 'todo', isCompleted: true }]);

      expect(todosService.todosSig()).toEqual([
        { id: '1', text: 'todo', isCompleted: true },
      ]);
    });
  });

  describe('addTodo', () => {
    it('creates a todo', () => {
      todosService.addTodo('todo');
      const req = httpTestingController.expectOne(baseUrl);
      req.flush({ id: '1', text: 'todo', isCompleted: true });

      expect(todosService.todosSig()).toEqual([
        { id: '1', text: 'todo', isCompleted: true },
      ]);
    });
  });

  describe('changeTodo', () => {
    it('updates a todo', () => {
      todosService.todosSig.set([
        { id: '1', text: 'todo1', isCompleted: true },
      ]);
      const id = '1';
      const text = 'todo2';
      todosService.changeTodo(id, text);

      const req = httpTestingController.expectOne(`${baseUrl}/${id}`);
      req.flush({ id: id, text: text, isCompleted: true });

      expect(todosService.todosSig()).toEqual([
        { id: id, text: text, isCompleted: true },
      ]);
    });
  });

  describe('removeTodo', () => {
    it('removes a todo', () => {
      const id = '1';
      todosService.todosSig.set([{ id: id, text: 'todo1', isCompleted: true }]);

      todosService.removeTodo(id);
      const req = httpTestingController.expectOne(`${baseUrl}/${id}`);
      req.flush({});

      expect(todosService.todosSig()).toEqual([]);
    });
  });

  describe('toggleTodo', () => {
    it('toggles a todo', () => {
      const id = '1';
      todosService.todosSig.set([
        { id: id, text: 'todo1', isCompleted: false },
      ]);

      todosService.toggleTodo(id);
      const req = httpTestingController.expectOne(`${baseUrl}/${id}`);
      req.flush({ id: id, text: 'todo1', isCompleted: true });

      expect(todosService.todosSig()).toEqual([
        { id: id, text: 'todo1', isCompleted: true },
      ]);
    });
  });

  describe('toggleAll', () => {
    it('toggles all todos', () => {
      todosService.todosSig.set([
        { id: '1', text: 'todo1', isCompleted: false },
        { id: '2', text: 'todo2', isCompleted: true },
      ]);

      todosService.toggleAll(true);
      const reqs = httpTestingController.match(request => request.url.includes(baseUrl));
      reqs[0].flush({ id: '1', text: 'todo1', isCompleted: true });
      reqs[1].flush({ id: '2', text: 'todo2', isCompleted: true });

      expect(todosService.todosSig()).toEqual([
        { id: '1', text: 'todo1', isCompleted: true },
        { id: '2', text: 'todo2', isCompleted: true },
      ]);
    });
  });
});
