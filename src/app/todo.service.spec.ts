import { TestBed, inject, async } from '@angular/core/testing';
import { AppSettings } from './app-settings';
import { TodoService } from './todo.service';

describe('TodoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TodoService]
    });


    let store = {};

    spyOn(localStorage, 'getItem').and.callFake((key: string): String => {
      return store[key] || null;
    });
    spyOn(localStorage, 'setItem').and.callFake((key: string, value: string): string => {
      return store[key] = value as string;
    });

  });

  it('should be created', inject([TodoService], (service: TodoService) => {
    expect(service).toBeTruthy();
  }));

  it('should retrieves all todos', async(inject([TodoService], (todoService) => {
    let todos = '[{"text":"fsdfsdfsdf","id":1,"completed":false},{"text":"fsfsffsdfs","id":2,"completed":false}]'
    expect<any>(localStorage.setItem(AppSettings.STORAGE_NAME, todos)).toEqual(todos);
    todoService.getTodos().subscribe(result => {
      expect(result.length).toBeGreaterThan(0)
      expect(result).toEqual(JSON.parse(localStorage.getItem(AppSettings.STORAGE_NAME)))
    });
  })));

  it('should adds todo', async(inject([TodoService], (todoService) => {
    const todos = '[{"text":"fsdfsdfsdf","id":1,"completed":false}]';
    const expectedRes = '{"text":"test","id":2,"completed":false}';

    expect<any>(localStorage.setItem(AppSettings.STORAGE_NAME, todos)).toEqual(todos);

    todoService.addTodo({ text: "test" }).subscribe(result => {
      expect(result).toEqual(JSON.parse(expectedRes))
    });
  })));

  it('should remove todo', async(inject([TodoService], (todoService) => {
    const todos = '[{"text":"test1","id":1,"completed":false},{"text":"test","id":2,"completed":false}]';
    const expectedTodos = '[{"text":"test","id":2,"completed":false}]';
    const expectedRes = '{"text":"test1","id":1,"completed":false}';

    expect<any>(localStorage.setItem(AppSettings.STORAGE_NAME, todos)).toEqual(todos);

    todoService.removeTodo({ id: 1 }).subscribe(result => {
      expect(result).toEqual(JSON.parse(expectedRes))
    });
    expect(localStorage.getItem(AppSettings.STORAGE_NAME)).toEqual(expectedTodos);
  })));


  it('should update todo', async(inject([TodoService], (todoService) => {
    const todos = '[{"text":"test1","id":1,"completed":false},{"text":"test","id":2,"completed":false}]';
    const expectedTodos = '[{"text":"1337","id":1,"completed":true},{"text":"test","id":2,"completed":false}]';
    const result = '{"text":"1337","id":1,"completed":true}';

    expect<any>(localStorage.setItem(AppSettings.STORAGE_NAME, todos)).toEqual(todos);

    todoService.updateTodo({ id: 1, text: "1337", completed: true }).subscribe(result => {
      expect(result).toEqual(result)
    });
    expect(localStorage.getItem(AppSettings.STORAGE_NAME)).toEqual(expectedTodos);
  })));

});
